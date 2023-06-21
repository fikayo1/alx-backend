const redis = require('redis');
const { promisify } = require('util');
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);

function connectToRedis() {
  client.ping((error) => {
    if (error) {
      console.log('Redis client not connected to the server:', error);
    } else {
      console.log('Redis client connected to the server');
    }
  });
}

function setNewSchool(schoolName, value) {
  client.set(schoolName, value, redis.print);
}

async function displaySchoolValue(schoolName) {
  try {
    const value = await getAsync(schoolName);
    console.log(value);
  } catch (error) {
    console.log('Error retrieving value:', error);
  }
}

connectToRedis();
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
