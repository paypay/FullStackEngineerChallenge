const mongoose = require('mongoose');

/*
  A Question can belong to many Reviews.
  Type indicates how the form and data will look like, such as free text input or number input.
*/

const schema = new mongoose.Schema({
  title: String,
  type: Number,
  isRequred: Boolean,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Question', schema);
