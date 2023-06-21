const redis = require('redis');
const client = redis.createClient();

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

function displaySchoolValue(schoolName) {
  client.get(schoolName, (error, value) => {
    if (error) {
      console.log('Error retrieving value:', error);
    } else {
      console.log(value);
    }
  });
}

connectToRedis();
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
