module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define('employee', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    fullname: {
      type: Sequelize.STRING,
    },
    department: {
      type: Sequelize.STRING,
    },
    title: {
      type: Sequelize.STRING,
    },
  });

  return Employee;
};
