// ps4.js
const express = require('express');
const request = require('request');
let fetch;
import('node-fetch').then(module => {
  fetch = module.default; // 'default' is used to extract the default export from the module
});
const router = express.Router();
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
router.post('/promise', (req, res) => {
  const brawlerName = req.body.brawlerName.toUpperCase();
  const url = `${apiEndpoint}/v1/brawlers`;
  const options = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json'
      }
  };

  requestPromise(url, options)
    .then(data => {
      if(data.reason === 'accessDenied.invalidIp') {
        res.status(401).send('Invalid IP address');
      } else {
        const brawlerInfo = data.items.find(item => item.name === brawlerName);
        console.log(brawlerInfo);
        res.render('results', { brawlerInfo }); // results is your template file
      }
    })
    .catch(error => {
      res.status(500).send(error.toString());
    });
});

// Route using async/await
router.post('/async', async (req, res) => {
  const brawlerName = req.body.brawlerName.toUpperCase();
  const url = `${apiEndpoint}/v1/brawlers`;
  const options = {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${apiKey}`,
      }
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    if(data.reason === 'accessDenied.invalidIp') {
      res.status(401).send('Invalid IP address');
    } else {
      const brawlerInfo = data.items.find(item => item.name === brawlerName);
      console.log(brawlerInfo);
      res.render('results', { brawlerInfo }); // results is your template file
    }
  }
  catch (error) {
    res.status(500).send(error.toString());
  }
});

// Route using traditional callbacks
router.post('/callback', (req, res) => {
  const brawlerName = req.body.brawlerName.toUpperCase();
  const url = `${apiEndpoint}/v1/brawlers`;
  const options = {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${apiKey}`,
      }
  };
  request(url, options, (error, response, body) => {
    if (error) {
      res.status(500).send(error.toString());
    } else {
      data = JSON.parse(body);
      if(data.reason === 'accessDenied.invalidIp') {
        res.status(401).send('Invalid IP address');
      } else {
        const brawlerInfo = data.items.find(item => item.name === brawlerName);
        console.log(brawlerInfo);
        res.render('results', { brawlerInfo }); // results is your template file
    }
  }
  });
});

module.exports = router;