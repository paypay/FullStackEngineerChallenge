const { model, Schema } = require('mongoose');

/*
  When an admin creates a Feedback with empty data,
  it means that a reviewee is assigned to a reviewer.
*/

const schema = new Schema({
  review: { type: Schema.Types.ObjectId, ref: 'Review' },
  reviewer: { type: Schema.Types.ObjectId, ref: 'User' },
  reviewee: { type: Schema.Types.ObjectId, ref: 'User' },
  text: '',
  data: [{
    question: { type: Schema.Types.ObjectId, ref: 'Question' },
    body: Object,
  }],
}, {
  timestamps: true,
});

module.exports = model('Feedback', schema);
