const { createClient } =require('redis');

const client = createClient()

const initializeRedis = async () => {
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
    console.log('Redis Client Connected');
    return client
}

module.exports = {client ,initializeRedis }


