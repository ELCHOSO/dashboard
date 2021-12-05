const { Router, response } = require('express');
const User = require('../persistence/users');
const router = new Router();

router.get('/', async (request, response) => {
  try {
    const check_user = await User.find(request.body.user.email);
    if (!check_user) {
      response.status(400).json({ message: `User does not exist` });
    }
    return response.status(200).json({ message: `The user is ${check_user.email}`, email: check_user.email });
  } catch (error) {
    console.error(
      `Whoami({ email: ${request.body.email} }) >> Error: ${error.stack}`
    );
  }
})

module.exports = router;
