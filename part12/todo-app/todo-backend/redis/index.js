const redis = require('redis')
const { promisify } = require('util')
const { REDIS_URL } = require('../util/config')
const { setDefaultAutoSelectFamily } = require('net')

let getAsync
let setAsync

if (!REDIS_URL) {
  const redisIsDisabled = () => {
    console.log('No REDIS_URL set, Redis is disabled')
    return null
  }
  getAsync = redisIsDisabled
  setAsync = redisIsDisabled
} else {
  const client = redis.createClient({
    url: REDIS_URL
  })
    
  getAsync = promisify(client.get).bind(client)
  setAsync = promisify(client.set).bind(client)    


  client.on('connect', async () => {
    console.log('Connected to Redis');

    try {
      const todosCounter = await getAsync('added_todos');
      if (todosCounter === null) {
        console.log('Initializing Redis key: added_todos with value 0')
        await setAsync('added_todos', 0);
      } else {
        console.log(`Redis key: added_todo already exist with value ${todosCounter}`)
      }
    } catch (error) {
      console.error('Error initializing Redis key:', error);
    }
    });

    client.on('error', (err) => {
      console.error('Redis error:', err);
    });
}

module.exports = {
  getAsync,
  setAsync
}