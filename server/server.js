const express = require('express');

const morgan = require('morgan');
const cors = require('cors');
const clientSession = require('client-sessions');
const helmet = require('helmet');

const { SESSION_SECRET } = require('./config');

const app = express();

app.use(cors());

const api = require('./src/api');

app.use(morgan('short'));
app.use(express.json());
app.use(
  clientSession({
    cookieName: 'session',
    secret: SESSION_SECRET,
    duration: 24 * 60 * 60 * 1000
  })
);
app.use(helmet());

app.use(api);

const init_db = require('./src/persistence/init-db')

init_db.initAll()

let server;
module.exports = {
  start(port) {
    server = app.listen(port, () => {
      console.log(`App started on port ${port}`);
    });
    return app;
  },
  stop() {
    server.close();
  }
};
