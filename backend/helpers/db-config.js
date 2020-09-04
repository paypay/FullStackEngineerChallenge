const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname + "/.env") });

let mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};
var database_to_use =
  process.env.NODE_ENV == "test"
    ? process.env.DATABASE_NAME_TEST
    : process.env.DATABASE_NAME;

mongoose.Promise = global.Promise;

const mongoUrl = `mongodb://paypay_mongo:${
  process.env.DATABASE_PORT
  }/${database_to_use}`;

console.debug(mongoUrl)
function open() {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(mongoUrl, mongooseOptions)
      .then(() => {
        resolve();
      })
      .catch(error => {
        console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${error.message}`);
        process.exit(1);
      });
  });
}

function close() {
  return mongoose.disconnect();
}

module.exports = { close, open };
