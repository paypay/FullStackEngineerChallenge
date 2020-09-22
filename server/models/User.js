const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/*
  A User is either an admin or an employee.
*/

const schema = new mongoose.Schema({
  login: {
    type: String,
    unique: true,
    required: true,
    set: (v) => v.toLowerCase(),
  },
  displayName: String,
  password: String,
  isAdmin: Boolean,
}, {
  timestamps: true,
});

/*
  Although it's common to rely on an identity provider to do SSO.
  If processing and storing user password is necessary,
  passwords should be hashed and salted properly.
  Bcrypt is consider a good choice.
*/

schema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  return bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    return bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(err);
      user.password = hash;
      return next();
    });
  });
});

/*
  Depending on acutal hash implementation,
  we should make sure it handles timing attacks.
*/

schema.methods.comparePassword = function (candidate, cb) {
  bcrypt.compare(candidate, this.password, (err, matches) => {
    if (err) return cb(err);
    return cb(null, matches);
  });
};

module.exports = mongoose.model('User', schema);
