// ps5b.js
const express = require('express');
const request = require('request');
let fetch;
import('node-fetch').then(module => {
  fetch = module.default; // 'default' is used to extract the default export from the module
});
const router = express.Router();
const redis = require('redis');
const redisClient = redis.createClient({ host: 'localhost', port: 6379 });
redisClient.on('error', (err) => console.log('Redis Client Error', err));
const { apiKey, apiEndpoint } = require('./config');


// Helper function to create a Promise for the 'request' package
function requestPromise(url, options) {
  return new Promise((resolve, reject) => {
    request(url, options, (error, response, body) => {
      if (error) {
        console.log("WHAT")
        reject(error);
      } else {
        resolve(JSON.parse(body));
      }
    });
  });
}

// Route using Promises
// Promise Route with Redis Cache
router.post('/promise', (req, res) => {
  const brawlerName = req.body.brawlerName.toUpperCase();
  const cacheKey = `brawlerInfo:${brawlerName}`;

  // Check cache first
  redisClient.get(cacheKey, (error, cachedData) => {
    if (error) res.status(500).send(error.toString());
    if (cachedData) {
      return res.json({ source: 'cache', data: JSON.parse(cachedData) });
    } else {
      // Fetch data and cache it
      const url = `${apiEndpoint}/v1/brawlers`;
      const options = {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${apiKey}` }
      };

      requestPromise(url, options)
        .then(data => {
          const brawlerInfo = data.items.find(item => item.name === brawlerName);
          // Set data in Redis cache
          redisClient.setex(cacheKey, 15, JSON.stringify(brawlerInfo)); // 15 seconds timeout
          
          res.json({ source: 'api', data: brawlerInfo });
        })
        .catch(error => {
          res.status(500).send(error.toString());
        });
    }
  });
});


// Route using async/await
// Async/Await Route with Redis Cache
router.post('/async', async (req, res) => {
  const brawlerName = req.body.brawlerName.toUpperCase();
  const cacheKey = `brawlerInfo:${brawlerName}`;
  
  // Check cache first
  redisClient.get(cacheKey, async (error, cachedData) => {
    if (error) res.status(500).send(error.toString());
    if (cachedData) {
      return res.json({ source: 'cache', data: JSON.parse(cachedData) });
    } else {
      // Fetch data and cache it
      try {
        const response = await fetch(`${apiEndpoint}/v1/brawlers`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${apiKey}` }
        });
        const data = await response.json();
        const brawlerInfo = data.items.find(item => item.name === brawlerName);

        // Set data in Redis cache
        redisClient.setex(cacheKey, 15, JSON.stringify(brawlerInfo)); // 15 seconds timeout

        res.json({ source: 'api', data: brawlerInfo });
      } catch (error) {
        res.status(500).send(error.toString());
      }
    }
  });
});


// Route using traditional callbacks
// Callback Route with Redis Cache
router.post('/callback', (req, res) => {
  const brawlerName = req.body.brawlerName.toUpperCase();
  const cacheKey = `brawlerInfo:${brawlerName}`;

  // Check cache first
  redisClient.get(cacheKey, (error, cachedData) => {
    if (error) res.status(500).send(error.toString());
    if (cachedData) {
      return res.json({ source: 'cache', data: JSON.parse(cachedData) });
    } else {
      // Fetch data and cache it
      const url = `${apiEndpoint}/v1/brawlers`;
      const options = {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${apiKey}` }
      };

      request(url, options, (error, response, body) => {
        if (error) {
          res.status(500).send(error.toString());
        } else {
          const data = JSON.parse(body);
          const brawlerInfo = data.items.find(item => item.name === brawlerName);
          // Set data in Redis cache
          redisClient.setex(cacheKey, 15, JSON.stringify(brawlerInfo)); // 15 seconds timeout

          res.json({ source: 'api', data: brawlerInfo });
        }
      });
    }
  });
});


module.exports = router;