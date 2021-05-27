const bcrypt = require("bcryptjs");
const Employee = require("../../db/models/employee");
const { serializeError } = require("serialize-error");
const { loginInputValidator } = require("../utils/validator");

const fetchEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({ isAdmin: false });
    return res.status(200).json(employees);
  } catch (err) {
    return res.status(500).json(serializeError(err));
  }
};

const updateEmployee = async (req, res) => {
  const {
    params: { employeeId },
  } = req;
  try {
    await Employee.findByIdAndUpdate(employeeId, req.body);
    return res.status(200).send({ message: "Data updated successFully" });
  } catch (err) {
    return res.status(500).json(serializeError(err));
  }
};

const addEmployee = async (req, res) => {
  const {
    body: { email, password, name, reviewer, isAdmin = false },
  } = req;
  const user = new Employee({ email, password, name, reviewer, isAdmin });
  try {
    loginInputValidator(email, password);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const saveUser = await user.save();
    return res.status(201).json(saveUser);
  } catch (err) {
    return res.status(500).json(serializeError(err));
  }
};
const deleteEmployee = async (req, res) => {
  const {
    params: { employeeId },
  } = req;
  try {
    const employee = await Employee.findByIdAndDelete(employeeId);
    return res.status(200).send({ message: "Employee Remove successFully" });
  } catch (err) {
    return res.status(500).json(serializeError(err));
  }
};

module.exports = {
  fetchEmployees,
  updateEmployee,
  addEmployee,
  deleteEmployee,
};
