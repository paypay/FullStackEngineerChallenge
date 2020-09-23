/* eslint-disable no-param-reassign */
const router = require('express').Router();
const { ObjectId } = require('mongoose').mongo;
const Review = require('../models/Review');
const auth = require('../middleware/auth');

router.get('/', (req, res) => {
  Review.find().limit(Number(req.query.limit) || 20).exec((err, docs) => {
    if (err) return res.sendStatus(500);
    return res.json(docs);
  });
});

router.post('/', auth.isAdmin, (req, res) => {
  const {
    title, starts, ends, isHidden, questions,
  } = req.body;
  new Review({
    title,
    starts: new Date(starts),
    ends: new Date(ends),
    isHidden,
    questions: questions.map((x) => ObjectId(x)),
  }).save((err) => {
    if (err) return res.sendStatus(500);
    return res.json({ result: 'ok' });
  });
});

router.patch('/:id', auth.isAdmin, (req, res) => {
  const { id } = req.params;
  const {
    title, starts, ends, isHidden, questions,
  } = req.body;
  Review.findOne({
    $or: [
      { _id: ObjectId(id) },
      { login: id },
    ],
  }, (err, review) => {
    if (err || !review) return res.sendStatus(500);
    if (title) review.title = title;
    if (starts) review.starts = new Date(starts);
    if (ends) review.ends = new Date(ends);
    if (isHidden) review.isHidden = isHidden;
    if (questions && Array.isArray(questions)) review.questions = questions.map((x) => ObjectId(x));
    return review.save((error) => {
      if (error) return res.sendStatus(500);
      return res.json({ result: 'ok' });
    });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Review.findOne({ _id: ObjectId(id) }, (err, result) => {
    if (err) return res.sendStatus(500);
    if (!result) return res.sendStatus(404);
    return res.json(result);
  });
});

module.exports = router;
