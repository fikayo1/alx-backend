import { createClient } from 'redis';
import { promisify } from 'util';
import express from 'express';

const listProducts = [
  {
    itemId: 1,
    itemName: 'Suitcase 250',
    price: 50,
    initialAvailableQuantity: 4
  },
  {
    itemId: 2,
    itemName: 'Suitcase 450',
    price: 100,
    initialAvailableQuantity: 10
  },
  {
    itemId: 3,
    itemName: 'Suitcase 650',
    price: 350,
    initialAvailableQuantity: 2
  },
  {
    itemId: 4,
    itemName: 'Suitcase 1050',
    price: 550,
    initialAvailableQuantity: 5
  }
];

const redisClient = createClient();

redisClient.get = promisify(redisClient.get);

redisClient.on('error', (err) => { console.log(err); });

function getItemById (id) {
  for (const item of listProducts) {
    if (item.itemId === parseInt(id)) return item;
  }
}

function reserveStockById (itemId, stock) {
  redisClient.set(itemId, stock);
}

async function getCurrentReservedStockById (itemId) {
  const stock = await redisClient.get(itemId);
  return stock;
}

const app = express();

app.get('/list_products', (req, res) => {
  res.send(listProducts);
});

app.get('/list_products/:itemId', async function (req, res) {
  const item = getItemById(req.params.itemId);
  if (!item) {
    res.send({ status: 'Product not found' });
  } else {
    const stock = await getCurrentReservedStockById(req.params.itemId);
    const respData = {
      itemId: item.itemId,
      itemName: item.itemName,
      price: item.price,
      initialAvailableQuantity: item.initialAvailableQuantity,
      currentQuantity:
        stock !== null ? parseInt(stock) : item.initialAvailableQuantity
    };
    res.send(respData);
  }
});

app.get('/reserve_product/:itemId', async function (req, res) {
  const item = getItemById(req.params.itemId);
  if (!item) {
    res.send({ status: 'Product not found' });
  } else {
    let stock = await getCurrentReservedStockById(req.params.itemId);
    if (!stock) {
      stock = item.initialAvailableQuantity;
    } else {
      stock = parseInt(stock);
    }
    if (stock <= 0) {
      res.send({ status: 'Not enough stock available', itemId: item.itemId });
    } else {
      reserveStockById(item.itemId, stock - 1);
      res.send({ status: 'Reservation confirmed', itemId: item.itemId });
    }
  }
});

app.listen('1245', () => { console.log('App started!'); });
