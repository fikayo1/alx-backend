import { createQueue } from 'kue';
import { createClient, print } from 'redis';
import { promisify } from 'util';
import express from 'express';

const client = createClient();
client.get = promisify(client.get);

client.on('error', (err) => { console.log(err); });

const queue = createQueue();

function reserveSeat (number) {
  client.set('available_seats', number, print);
}

async function getCurrentAvailableSeats () {
  return await client.get('available_seats');
}

let reservationEnabled = true;

const app = express();

app.get('/available_seats', async function (req, res) {
  const seats = await getCurrentAvailableSeats();
  res.send({ numberOfAvailableSeats: seats });
});

app.get('/reserve_seat', (req, res) => {
  if (!reservationEnabled) {
    res.send({ status: 'Reservation are blocked' });
    return;
  }
  const job = queue.create('reserve_seat');
  job.on('complete', () => {
    console.log(`Seat reservation job ${job.id} completed`);
  });
  job.on('error', (error) => {
    console.log(`Seat reservation job ${job.id} failed: ${error}`);
  });
  job.save((err) => {
    if (!err) {
      res.send({ status: 'Reservation in process' });
    } else {
      res.send({ status: 'Reservation failed' });
    }
  });
});

app.get('/process', (req, res) => {
  queue.process('reserve_seat', (job, done) => {
    getCurrentAvailableSeats()
      .then((seats) => {
        if (seats === 0) {
          reservationEnabled = false;
          done(Error('Not enough seats available'));
        } else {
          reserveSeat(seats - 1);
          done();
        }
      });
  });
  res.send({ status: 'Queue processing' });
});

app.listen('1245', () => {
  console.log('App listening on port 1245');
  reserveSeat(50);
});
