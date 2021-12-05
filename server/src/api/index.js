const express = require('express');

const { Router } = express;
const router = new Router();
const middleware = require('../middleware/security')
const user = require('./user');
const whoami = require('./whoami');
const widgets = require('./widget');
const oauth = require('./oauth');
router.use('/users', user);
router.use('/oauth', oauth);
router.use('/whoami', middleware.checkJWT, whoami);
router.use('/widgets', middleware.checkJWT, widgets);

module.exports = router;
