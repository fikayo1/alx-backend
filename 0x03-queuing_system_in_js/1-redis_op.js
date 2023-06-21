import redis from 'redis';

async function connectToRedis () {
  try {
    const client = await redis.createClient();
    await client.ping();
    console.log('Redis client connected to the server');
  } catch (error) {
    console.log('Redis client not connected to the server:', error);
  }
}

async function setNewSchool (schoolName, value) {
  const client = await redis.createClient();
  await client.set(schoolName, value, redis.print);
}

async function displaySchoolValue (schoolName) {
  const client = await redis.createClient();
  await client.get(schoolName);
  console.log(schoolName);
}

connectToRedis();
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
