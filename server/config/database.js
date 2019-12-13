var Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql://root:example@localhost:3308/performance');

module.exports = {
    sequelize: sequelize,
    Sequelize: Sequelize
};