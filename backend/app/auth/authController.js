const bcrypt = require("bcrypt");
const User = require("../users/User");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const ro = require("../../helpers/response-object");
const uuidv4 = require("uuid/v4");
const sendVerificationMail = require("../../helpers/mailer");
const Boom = require("boom");
const salt = bcrypt.genSaltSync(saltRounds);

const userObject = user => {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
    subscription: user.subscription,
    role: user.role
  };

  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: 86400 });
  return { jwtToken: token };
};
module.exports.signin = async (req, res) => {
  try {
    if (!req.body) {
      return Boom.badData(`Not enough data send to server. Provide email + password`);
    } else if (!req.body.email) {
      return Boom.badData(`Email missing`);
    } else {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return Boom.notFound(`User not found`);
      } else if (user) {
        if (!user.verifiedAt) {
          try {
            const userToken = uuidv4(4);
            await sendVerificationMail(req, userToken);
            user.verificationToken = userToken;
            User.update(user);

            return Boom.forbidden(`User not verified yet, check your emails for a verification link`);
          } catch (e) {
            console.log("Error in authController.signin", e);
          }
        } else {
          const hashedPW = bcrypt.compareSync(req.body.password, user.password); // true
          if (!hashedPW) {
            return Boom.unauthorized("Authentication failed. Wrong password.");
          } else {
            return userObject(user);
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports.refreshtoken = (req, res, next) => {
  const user = req.user;
  return res.json(ro(201, `Welcome`, userObject(user)));
};
