/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config');

module.exports = (req, res) => {
  const { login, password } = req.body;
  User.findOne({ login }, (err, user) => {
    if (err) return res.sendStatus(500);
    if (!user) return res.sendStatus(403);
    return user.comparePassword(password, (error, matches) => {
      if (error) return res.sendStatus(500);
      if (!matches) return res.sendStatus(403);
      const profile = {
        id: user._id,
        login: user.login,
        isAdmin: user.isAdmin,
      };
      const token = jwt.sign(profile, config.jwtSecret, { expiresIn: '4h' });
      return res.json({ token, profile });
    });
  });
};
