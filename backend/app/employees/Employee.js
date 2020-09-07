const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// Employee Schema
const EmployeeSchema = mongoose.Schema({
  email: {
    type: String,
    index: true
  },
  name: {
    type: String
  },
  password: {
    type: String
  },
  role: {
    type: String,
    default: "user"
  },
  verificationToken: {
    type: String,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  verifiedAt: {
    type: Date
  }
});

const Employee = (module.exports = mongoose.model("Employee", EmployeeSchema));

module.exports.createEmployee = (newEmployee, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newEmployee.password, salt, (err, hash) => {
      newEmployee.password = hash;
      newEmployee.save(callback);
    });
  });
};
module.exports.getEmployeeByEmail = (email, callback) => {
  const query = { email: email };
  Employee.findOne(query, callback);
};

module.exports.getEmployeeById = function(id, callback) {
  Employee.findById(id, callback);
};

module.exports.comparePassword = (candidatePassword, hash, callback) => {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};
