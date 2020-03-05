const express = require('express');
const path = require('path');
require('dotenv').config();
const fetch = require('node-fetch');
const API_KEY = process.env.API_KEY;

const app = express();
const port = 3000;

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// app.post('/api', (request, response) => {
//   console.log('I got request');
//   console.log(request.body);
// });

app.get('/weather/:id', async (request, response) => {
  console.log('hit weather api');
  console.log('id', request.params.id);
  const id = request.params.id;
  const query = `${id}?apikey=${API_KEY}`;
  const apiUrl = `https://dataservice.accuweather.com/currentconditions/v1/${query}`;

  const fetchResponse = await fetch(apiUrl);
  const data = await fetchResponse.json();
  response.json(data);
});

app.get('/weather/location/:city', async (request, response) => {
  console.log('city', request.params.city);
  const city = request.params.city;
  const query = `?apikey=${API_KEY}&q=${city}`;
  const apiUrl = `https://dataservice.accuweather.com/locations/v1/cities/search${query}`;
  const fetchResponse = await fetch(apiUrl);
  const data = await fetchResponse.json();
  response.json(data);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
