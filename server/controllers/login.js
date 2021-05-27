const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CONFIG = require("../config");
const { serializeError } = require("serialize-error");
const { loginInputValidator } = require("../utils/validator");
const Employee = require("../../db/models/employee");

const login = async (req, res) => {
  const {
    body: { email, password },
  } = req;
  try {
    loginInputValidator(email, password);
    const employee = await Employee.findOne({ email });
    const match = await bcrypt.compare(password, employee.password);
    if (!employee) throw new Error("employee not found");
    if (!match) throw new Error("password is inCorrect");
    const { id, name, reviewer, isAdmin } = employee;
    jwt.sign(
      { id, name, reviewer },
      CONFIG.jwtSecret,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        return res.status(200).json({
          success: true,
          isAdmin,
          reviewer,
          id,
          name,
          token,
        });
      }
    );
  } catch (err) {
    return res.status(500).json(serializeError(err));
  }
};

module.exports = login;
