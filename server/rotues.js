const employee = require("./routes/employee");
const login = require("./routes/login");
const feedback = require("./routes/feedback");
const logout = require("./routes/logout");
const me = require("./routes/me");
const apiPath = "/api/paypay";

const routes = (app) => {
  app.use(apiPath, employee);
  app.use(apiPath, feedback);
  app.use(apiPath, me);
  app.use(apiPath, logout);
  app.use(apiPath, login);
};

module.exports = routes;
