const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const constants = require('./src/config/constants.js');

const app = express();

const corsOptions = {
  // now only the frontend on localhost can access the api
  origin: `${constants.FRONTEND_DOMAIN}:${constants.FRONTEND_PORT}`,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./src/models');

db.sequelize.sync();

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to thinhvo0108 application.' });
});

require('./src/routes/adminRoutes')(app);

// set port, listen for requests
const PORT = process.env.PORT || constants.SERVER_PORT;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${PORT}.`);
});
