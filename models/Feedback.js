const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FeedbackSchema = new Schema({
    feedbackToName: {
        type: String,
        required: true
    },
    feedbackToEmail: {
        type: String,
        required: true
    },
    feedbackByName: {
        type: String,
        required: true
    },
    feedbackByEmail: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    comments: {
        type: String
    },
    createdOn: {
      type: Date,
      default: Date.now  
    },
    submittedOn: {
        type: Date
    },
    requestedByName: {
        type: String,
        required: true
    },
    requestedByEmail: {
        type: String,
        required: true
    }
});

module.exports = Feedback = mongoose.model("feedbacks", FeedbackSchema);
