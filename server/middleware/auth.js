const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

/*
  Whether using JWT or Cookies/session depends.
  JWT makes it easier to seperate frontend and API,
  as well as allowing API servers to scale more easily.
*/

const authParser = (req, res, next) => {
  req.user = {};
  if (!req.headers.authorization) return next();
  const matches = req.headers.authorization.match(/^Bearer (.+)/);
  if (!matches) return next();
  const [, token] = matches;
  jwt.verify(token, jwtSecret, {}, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user.login = decoded.login;
    req.user.isAdmin = decoded.isAdmin;
    req.user.id = decoded.id;
    return next();
  });
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
