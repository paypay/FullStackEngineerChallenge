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
    type: Date
  },
});

const Review = (module.exports = mongoose.model("Review", ReviewSchema));