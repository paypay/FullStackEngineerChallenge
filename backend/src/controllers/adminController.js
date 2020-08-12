const db = require('../models');

const Admin = db.admin;
const Employee = db.employee;

const findAdmin = async (obj) => {
  const admin = await Admin.findOne({
    where: obj,
  });
  return admin;
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const admin = await findAdmin({ email, password });
  if (admin) {
    res.send({ message: 'ok', admin });
    return;
  }
  res.status(401).send({ message: 'Login failed' });
};

exports.logout = (req, res) => {
  res.send({ message: 'ok' });
};

exports.findAllEmployeesAdmin = (req, res) => {
  Employee.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving employees.',
      });
    });
};

exports.createEmployeeAdmin = async (req, res) => {
  const { email, password, fullname, department, title } = req.body;

  const employee = {
    email,
    password,
    fullname,
    department,
    title,
  };
  const data = await Employee.create(employee);
  if (data) {
    res.send({ message: 'ok', data });
    return;
  }
  res.status(401).send({ message: 'Create new employee failed' });
};

exports.deleteEmployeeAdmin = async (req, res) => {
  const { id } = req.params;

  const data = await Employee.destroy({
    where: { id },
  });

  if (data) {
    res.send({ message: 'ok', data });
    return;
  }
  res.status(401).send({ message: 'Delete employee failed' });
};
