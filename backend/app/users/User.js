var mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// User Schema
var UserSchema = mongoose.Schema({
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
    default: false
  },
  verificationToken: {
    type: String,
    default: false
  },
  subscription: {
    type: Object
  },
  createdAt: {
    type: Date
  },
  verifiedAt: {
    type: Date
  }
});

var User = (module.exports = mongoose.model("User", UserSchema));

module.exports.createUser = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};
module.exports.getUserByEmail = (email, callback) => {
  var query = { email: email };
  User.findOne(query, callback);
};

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
};

module.exports.comparePassword = (candidatePassword, hash, callback) => {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};
