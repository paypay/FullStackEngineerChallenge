/* eslint-disable no-param-reassign */
const router = require('express').Router();
const { ObjectId } = require('mongoose').mongo;
const Feedback = require('../models/Feedback');
const auth = require('../middleware/auth');

router.get('/', auth.isAdmin, (req, res) => {
  Feedback.find().limit(Number(req.query.limit) || 20)
    .populate('review')
    .populate('reviewer')
    .populate('reviewee')
    .exec((err, docs) => {
      if (err) return res.sendStatus(500);
      return res.json(docs);
    });
});

router.get('/from-me', (req, res) => {
  Feedback.find({
    reviewer: ObjectId(req.user.id),
  }).limit(Number(req.query.limit) || 20)
    .populate('review')
    .populate('reviewer')
    .populate('reviewee')
    .exec((err, docs) => {
      if (err) return res.sendStatus(500);
      return res.json(docs);
    });
});

router.get('/to-me', (req, res) => {
  /*
    TODO: Should only allow ended Review being displayed.
          Can user see reviewers name?
 */
  Feedback.find({
    reviewee: ObjectId(req.user.id),
  }).limit(Number(req.query.limit) || 20)
    .populate('review')
    .populate('reviewer')
    .populate('reviewee')
    .exec((err, docs) => {
      if (err) return res.sendStatus(500);
      return res.json(docs);
    });
});

// Used when an admin User assigns employee to review another employee
router.post('/', auth.isAdmin, (req, res) => {
  const {
    review, reviewer, reviewee,
  } = req.body;
  // TODO: Should check if ID of review, reviewer, reviewee actually exists
  new Feedback({
    review: ObjectId(review),
    reviewer: ObjectId(reviewer),
    reviewee: ObjectId(reviewee),
    text: '',
    data: [],
  }).save((err) => {
    if (err) return res.sendStatus(500);
    return res.json({ result: 'ok' });
  });
});

// Used when reviewer submits Feedback toward reviewee
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  //  const { data } = req.body;
  //  if (!data || !Array.isArray(data)) return res.sendStatus(400);
  return Feedback.findOne(
    {
      _id: ObjectId(id),
      reviewer: ObjectId(req.user.id),
    },
    (err, feedback) => {
      if (err) return res.sendStatus(500);
      if (!feedback) return res.sendStatus(400);
      feedback.text = String(text);
      /*
      try {
        feedback.data = req.body.data.map(({ question, body }) => ({
          question: ObjectId(question),
          body,
        }));
      } catch (e) {
        return res.sendStatus(400);
      }
     */
      return feedback.save((error) => {
        if (error) return res.sendStatus(500);
        return res.json({ result: 'ok' });
      });
    },
  );
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Feedback.findOne({ _id: ObjectId(id) })
    .populate('review')
    .populate('reviewer')
    .populate('reviewee')
    .exec((err, result) => {
      if (err) return res.sendStatus(500);
      if (!result) return res.sendStatus(404);
      return res.json(result);
    });
});

module.exports = router;
