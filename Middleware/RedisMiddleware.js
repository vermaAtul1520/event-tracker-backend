const { RedisClient } = require('../RedisConfig');


const cacheMiddleware = async (req, res, next) => {
    let key = `${req.path}`;

    if(key==="/events/all"){
        RedisClient.get(key, (err, cachedData) => {
            if (err) {
                console.error("Cache hits and getting error", err);
                return next();
            }
    
            if (cachedData) {
                return res.send(parseJson(cachedData));
            }
        });
    }

    next();
}

// This function is used anywhere to set the data in cache
async function setCache(key,value,options = {},) {
    let expireTime = options?.expire ||  1 * 60 * 60; // by defaoult caching time is 1 hour..

    try {
        await RedisClient.setex(key, expireTime, value);
    } catch (error) {
        if (error.message.includes('Connection is closed')) {
            console.warn('Redis connection closed, attempting reconnection...');
            await RedisClient.connect();
            try {
                await RedisClient.setex(key,expireTime,value);
            } catch (retryError) {
                console.error(`Failed to set value after reconnection:`, retryError);
            }
        }
    }
}


module.exports = {
    cacheMiddleware,
    setCache
};