const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const config = require("./config");
const addAdminUser = require("../db/addAdminUser");

const app = express();
const routes = require("./rotues");

app.use("*", cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
routes(app);

mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB is connected successfully.");
  })
  .catch((err) => console.log(err));
addAdminUser();

app.listen(config.PORT, () =>
  console.log(`Server up and running on ${config.PORT}`)
);
