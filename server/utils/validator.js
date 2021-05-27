const validator = require("validator");
const errorMessages = require("../error/enum");

const loginInputValidator = (email, password) => {
  if (!email.trim() || !password.trim())
    throw new Error(errorMessages.EMAIL_AND_PASSWORD_EMPTY);
  if (!validator.isEmail(email)) throw new Error("Please check our email.id");
  return true;
};

module.exports = {
  loginInputValidator,
};
