const Redis = require('ioredis');
const dotenv = require('dotenv');
dotenv.config();

const RedisClient = new Redis({
    host: process.env.REDIS_HOST_URI,
    port: 15214,
    password: process.env.REDIS_HOST_PASSWORD,
});

module.exports = {
    RedisClient
}