//
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  employeeId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  comments: {
    text: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
