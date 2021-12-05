const { Router } = require('express');
const router = new Router();
const axios = require('axios');

router.get('/', async (request, response) => {
  const token = request.query.token
  let header = {
    "Authorization": `Bearer ${token}`
  }
  await axios.get("https://api.spotify.com/v1/me/player", { headers: header }).then((resp) => {
    console.log(resp.data)
    response.status(200).json(resp.data)
  }).catch((error) => {
    console.log(error)
    response.status(400).json(error)
  })
});

module.exports = router;
