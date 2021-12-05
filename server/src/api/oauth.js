const { Router } = require('express');
const router = new Router();
const { google_clientID, google_secret, spotify_clientID, spotify_secret, jwt_key } = require('../../config');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const Users = require("../persistence/users")
var querystring = require('querystring');

function getGoogleAuthURL() {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: `http://localhost:8000/oauth/google`,
    client_id: `${google_clientID}`,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/calendar.readonly",
      "https://www.googleapis.com/auth/calendar",
      "https://www.googleapis.com/auth/calendar.events.readonly",
      "https://www.googleapis.com/auth/calendar.events"

    ].join(" ")
  };
  return `${rootUrl}?${querystring.stringify(options)}`;
}

router.get("/google/url", (request, response) => {
  return response.send(getGoogleAuthURL());
});

function getTokens(code) {
  const url = "https://oauth2.googleapis.com/token";
  const values = {
    code,
    client_id: google_clientID,
    client_secret: google_secret,
    redirect_uri: "http://localhost:8000/oauth/google",
    grant_type: "authorization_code",
  };

  return axios
    .post(url, querystring.stringify(values), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error(`Failed to fetch auth tokens`);
      throw new Error(error.message);
    });
}

router.get("/google", async (req, response) => {
  const { id_token, access_token } = await getTokens(req.query.code)

  console.log(access_token)

  const googleUser = await axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    )
    .then((res) => {
      Users.find(res.data.email).then(user => {
        if (user) {
          delete user.password
          const jwtToken = jwt.sign({ user }, jwt_key);
          return response.status(200).json({
            message: "Send google tokens",
            jwt: jwtToken,
            access_token
          })
        } else {
          Users.create(res.data.email, '').then(user => {
            const jwtToken = jwt.sign({ user }, jwt_key);
            return response.status(200).json({
              message: "Send google tokens",
              jwt: jwtToken,
              access_token
            })
          })
        }
      })
        .catch((error) => {
          throw error;
        });
    })
})

router.get('/spotify/url', function (req, res) {
  var scope = 'user-read-private user-read-email user-top-read user-read-currently-playing user-read-playback-state';
  return res.send('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'token',
      client_id: spotify_clientID,
      scope: scope,
      redirect_uri: "http://localhost:8000/oauth/spotify"
    }));
});

module.exports = router;
