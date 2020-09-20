const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: String,
  type: Number,
  isRequred: Boolean,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Question', schema);
