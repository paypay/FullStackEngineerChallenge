require('dotenv').config();

/*
  Creating a `.env` at app root makes it easier to manage dev environment.
  While in prod environment, we should use other method instead of creating a file.
*/

module.exports = {
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
};
