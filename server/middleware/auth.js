const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

const authParser = (req, res, next) => {
  req.user = {};
  if (!req.headers.authorization) return next();
  const matches = req.headers.authorization.match(/^Bearer (.+)/);
  if (!matches) return next();
  const [, token] = matches;
  const decoded = jwt.verify(token, jwtSecret);
  req.user.login = decoded.login;
  req.user.isAdmin = decoded.isAdmin;
  return next();
};

const isLoggedIn = (req, res, next) => {
  if (!req.user.login) return res.sendStatus(403);
  return next();
};

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) return res.sendStatus(403);
  return next();
};

module.exports = {
  authParser,
  isLoggedIn,
  isAdmin,
};
