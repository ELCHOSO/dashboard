const { Router } = require('express');
const router = new Router();
const axios = require('axios');
const { movie_api_key } = require('../../../config')
var querystring = require('querystring');

router.get('/', async (request, response) => {
  try {
    const language = request.query.language
    const page = request.query.page

    if (!language) {
      return response
        .status(400)
        .json({ message: 'Language must be provided' });
    }
    axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${movie_api_key}&language=${language}&page=${page}`).then(res => {
      return response.status(200).json(res.data)
    })
  } catch (error) {
    console.error(
      `Calendar >> ${error.stack}`
    );
    response.status(500).json();
  }
});

module.exports = router;
