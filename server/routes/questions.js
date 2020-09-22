const router = require('express').Router();
const { ObjectId } = require('mongoose').mongo;
const Question = require('../models/Question');
const auth = require('../middleware/auth');

router.get('/', (req, res) => {
  Question.find().limit(Number(req.query.limit) || 20).exec((err, docs) => {
    if (err) return res.sendStatus(500);
    return res.json(docs);
  });
});

router.post('/', auth.isAdmin, (req, res) => {
  const {
    title, type, isRequired,
  } = req.body;
  new Question({
    title,
    type,
    isRequired,
  }).save((err) => {
    if (err) return res.sendStatus(500);
    return res.json({ result: 'ok' });
  });
});

router.patch('/:id', auth.isAdmin, (req, res) => {
  const { id } = req.params;
  const { title, type, isRequired } = req.body;
  Question.findOneAndUpdate(
    { _id: ObjectId(id) }, {
      title,
      type,
      isRequired,
    }, (err) => {
      if (err) return res.sendStatus(500);
      return res.json({ result: 'ok' });
    },
  );
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Question.findOne({ id: ObjectId(id) }, (err, result) => {
    if (err) return res.sendStatus(500);
    if (!result) return res.sendStatus(404);
    return res.json(result);
  });
});

module.exports = router;
