const mongoose = require("mongoose");
// Feedback Schema
const FeedbackSchema = mongoose.Schema({
  text: {
    type: String,
  },
  review: {
    type: mongoose.Schema.ObjectId, ref: "Review"
  },
  employee: {
    type: mongoose.Schema.ObjectId, ref: "Employee"
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
});

const Feedback = (module.exports = mongoose.model("Feedback", FeedbackSchema));