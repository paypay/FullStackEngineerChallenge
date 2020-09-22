const { model, Schema } = require('mongoose');

/*
  A Review is like a event which can be created by admin User.
  It has many Questions to be answered by Users creating Feedbacks.
*/

const schema = new Schema({
  title: String,
  starts: Date,
  ends: Date,
  isHidden: Boolean,
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
}, {
  timestamps: true,
});

module.exports = model('Review', schema);
