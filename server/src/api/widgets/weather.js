const { Router } = require('express');
const router = new Router();
const axios = require('axios');
const { weather_key } = require('../../../config')

router.get('/', async (request, response) => {
  const city = request.query.city

  await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weather_key}&units=metric`).then((resp) => {
    response.status(200).json(resp.data)
  }).catch((error) => {
    console.log(error)
    response.status(400).json(error)
  })
});

module.exports = router;
