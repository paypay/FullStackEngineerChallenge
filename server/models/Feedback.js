const { model, Schema } = require('mongoose');

const schema = new Schema({
  review: { type: Schema.Types.ObjectId, ref: 'Review' },
  reviewer: { type: Schema.Types.ObjectId, ref: 'User' },
  reviewee: { type: Schema.Types.ObjectId, ref: 'User' },
  data: [{
    question: { type: Schema.Types.ObjectId, ref: 'Question' },
    body: Object,
  }],
}, {
  timestamps: true,
});

module.exports = model('Feedback', schema);
