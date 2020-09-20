const { model, Schema } = require('mongoose');

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
