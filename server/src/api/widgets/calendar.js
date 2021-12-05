const { Router } = require('express');
const router = new Router();
const axios = require('axios');
const { google_apiKey } = require('../../../config')
var querystring = require('querystring');

router.post('/', async (request, response) => {
  try {
    let { oauth_token, timeMin, timeMax } = request.body;
    timeMin = timeMin.slice(0, -5)
    timeMin += "-00:00"
    timeMax = timeMax.slice(0, -5)
    timeMax += "-00:00"
    if (!oauth_token || !timeMin || !timeMax) {
      return response
        .status(400)
        .json({ message: 'All infos must be provided' });
    }
    axios.get(`https://www.googleapis.com/calendar/v3/calendars/primary/events?${querystring.stringify({ timeMin, timeMax, key: google_apiKey })}`,
      {
        headers: {
          Authorization: `Bearer ${oauth_token}`,
          Accept: "application/json"
        }
      }).then(res => {
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
