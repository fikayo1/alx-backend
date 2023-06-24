const redis = require('redis');
const client = redis.createClient();

function connectToRedis () {
  client.ping((error) => {
    if (error) {
      console.log('Redis client not connected to the server:', error);
    } else {
      console.log('Redis client connected to the server');
    }
  });
}

function setNewSchool () {
  client.hset('HolbertonSchools', 'Portland', '50', redis.print);
  client.hset('HolbertonSchools', 'Seattle', '80', redis.print);
  client.hset('HolbertonSchools', 'New York', '20', redis.print);
  client.hset('HolbertonSchools', 'Bogota', '20', redis.print);
  client.hset('HolbertonSchools', 'Cali', '40', redis.print);
  client.hset('HolbertonSchools', 'Paris', '2', redis.print);
}

function displaySchoolValue () {
  client.hgetall('HolbertonSchools', (error, value) => {
    if (error) {
      console.log('Error retrieving value:', error);
    } else {
      console.log(value);
    }
  });
}

connectToRedis();
setNewSchool();
displaySchoolValue();
