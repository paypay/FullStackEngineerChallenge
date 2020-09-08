const mongoose = require("mongoose");
// Review Schema
const ReviewSchema = mongoose.Schema({
  score: {
    type: String,
  },
  employee: {
    type: mongoose.Schema.ObjectId, ref: "Employee",
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
});

const Review = (module.exports = mongoose.model("Review", ReviewSchema));