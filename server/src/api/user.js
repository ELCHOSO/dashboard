const { Router } = require('express');
const User = require('../persistence/users');
const jwt = require('jsonwebtoken');
const { jwt_key } = require('../../config');
const router = new Router();

router.post('/whoami', async (request, response) => {
  try {
    const check_user = await User.find(request.body.user.email);
    if (!check_user) {
      response.status(400).json({ message: `User does not exist` });
    }
    response.status(200).json({ message: `The user is ${check_user.email}`, email: check_user.email });
  } catch (error) {
    console.error(
      `Whoami({ email: ${request.body.email} }) >> Error: ${error.stack}`
    );
  }
})

router.post('/register', async (request, response) => {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      return response
        .status(400)
        .json({ message: 'email and password must be provided' });
    }
    const check_user = await User.find(email);
    if (check_user) {
      return response.status(400).json({ message: 'User already exists' });
    }
    const user = await User.create(email, password);
    return response.status(200).json({
      message: 'User registered !',
      jwt: jwt.sign({ user }, jwt_key)
    });
  } catch (error) {
    console.error(
      `createUser({ email: ${request.body.email} }) >> Error: ${error.stack}`
    );
    response.status(500).json();
  }
});

router.post('/login', async (request, response) => {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      return response
        .status(400)
        .json({ message: 'email and password must be provided' });
    }
    User.connect(email, password, (check_connect) => {
      if (check_connect.code === 'no email') {
        return response.status(400).json({ message: 'User does not exists' });
      } else if (check_connect.code === "invalid") {
        return response.status(400).json({ message: 'Invalid email or password' });
      } else {
        return response.status(200).json({
          message: 'connected',
          jwt: jwt.sign({ user: check_connect.user }, jwt_key)
        });
      }
    })
  } catch (error) {
    console.error(
      `login({ email: ${request.body.email}, password: ${request.body.password} }) >> Error: ${error.stack}`
    );
    response.status(500).json();
  }
});

module.exports = router;
