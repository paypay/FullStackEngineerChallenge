module.exports = (sequelize, Sequelize) => {
  const Admin = sequelize.define('admin', {
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
  });

  return Admin;
};
