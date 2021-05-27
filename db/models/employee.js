const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  reviewer: {
    type: Boolean,
    required: true,
  },
  isAdmin: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
