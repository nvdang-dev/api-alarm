const { Router } = require('express');
var { tall } = require('tall')

async function someFunction(link) {
    try {
      const unshortenedUrl = await tall(link)
      console.log('Tall url', unshortenedUrl)
      return unshortenedUrl
      
    } catch (err) {
      console.error('AAAW 👻', err)
      return 'error'
    }
  }
const { SuccessResponseObject } = require('../common/http');
const demo = require('./demo.route');


const r = Router();

// r.use('/demo', demo);

r.get('/', (req, res) => res.json(new SuccessResponseObject('express vercel boiler plate')));
r.post('/get-link', async (req, res) => {
    console.log("link", req.body);
    try {
        const { link } = req.body;
        console.log("link", link);
        const response = await someFunction(link)
        console.log("response", response);
        if (response) {
        //   const fullURL = response.headers.location;
          res.json({ response });
        } else {
          res.json({ response: link}); // No redirect, so return the provided URL as is.
        }
      } catch (error) {
        res.status(500).json({ error: 'Failed to expand the shortened URL' });
      }
});
module.exports = r;
