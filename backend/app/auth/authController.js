const bcrypt = require("bcrypt");
const Employee = require("../employees/Employee");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
// TODO create a unified response bottleneck. Unveils full power if app grows and response differs from request to request
const ro = require("../../helpers/response-object");
const uuidv4 = require("uuid/v4");
const sendVerificationMail = require("../../helpers/mailer");
const Boom = require("boom");
const salt = bcrypt.genSaltSync(saltRounds);

// TODO create a unified response bottleneck. Unveils full power if app grows and response differs from request to request
const employeeObject = employee => {
  const payload = {
    id: employee.id,
    email: employee.email,
    name: employee.name,
    subscription: employee.subscription,
    role: employee.role
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
      const employee = await Employee.findOne({ email: req.body.email });
      if (!employee) {
        return Boom.notFound(`Employee not found`);
      } else if (employee) {
        if (!employee.verifiedAt) {
          try {
            const employeeToken = uuidv4(4);
            await sendVerificationMail(req, employeeToken);
            employee.verificationToken = employeeToken;
            Employee.update(employee);

            return Boom.forbidden(`Employee not verified yet, check your emails for a verification link`);
          } catch (e) {
            console.log("Error in authController.signin", e);
          }
        } else {
          const hashedPW = bcrypt.compareSync(req.body.password, employee.password); // true
          if (!hashedPW) {
            return Boom.unauthorized("Authentication failed. Wrong password.");
          } else {
            return employeeObject(employee);
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};
// TODO currently unused - later purpose for polling interval if token expired
module.exports.refreshtoken = (req, res, next) => {
  const employee = req.employee;
  return res.json(ro(201, `Welcome`, employeeObject(employee)));
};
