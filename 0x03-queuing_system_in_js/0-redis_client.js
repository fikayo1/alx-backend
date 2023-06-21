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

connectToRedis();
