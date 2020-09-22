const router = require('express').Router();
const { ObjectId } = require('mongoose').mongo;
const User = require('../models/User');
const auth = require('../middleware/auth');

router.get('/', (req, res) => {
  // Only display appropriate data, should not output fields such as password (even if hashed)
  User.find().limit(Number(req.query.limit) || 20).select('login displayName').exec((err, docs) => {
    if (err) return res.sendStatus(500);
    return res.json(docs);
  });
});

router.post('/', auth.isAdmin, (req, res) => {
  const {
    login, displayName, password, isAdmin,
  } = req.body;

  new User({
    login,
    displayName,
    password,
    isAdmin,
  }).save((err) => {
    if (err) return res.sendStatus(500);
    return res.json({ result: 'ok' });
  });
});

router.patch('/:id', auth.isAdmin, (req, res) => {
  // TODO: Allow user change own password
  const { id } = req.params;
  const { displayName, password, isAdmin } = req.body;
  User.findOneAndUpdate({
    $or: [
      { _id: ObjectId(id) },
      { login: id },
    ],
  }, {
    displayName,
    password,
    isAdmin,
  }, (err) => {
    if (err) return res.sendStatus(500);
    return res.json({ result: 'ok' });
  });
});

router.delete('/:id', auth.isAdmin, (req, res) => {
  const { id } = req.params;
  User.deleteOne({
    $or: [
      { _id: ObjectId(id) },
      { login: id },
    ],
  }, (err) => {
    if (err) return res.sendStatus(500);
    return res.json({ result: 'ok' });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  User.findOne({
    $or: [
      { _id: ObjectId(id) },
      { login: id },
    ],
  }, (err, result) => {
    if (err) return res.sendStatus(500);
    if (!result) return res.sendStatus(404);
    return res.json(result);
  });
});

module.exports = router;
