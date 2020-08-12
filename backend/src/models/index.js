const Sequelize = require('sequelize');
const dbConfig = require('../config/db.js');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  // operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.admin = require('./adminModel.js')(sequelize, Sequelize);
db.employee = require('./employeeModel.js')(sequelize, Sequelize);
db.review = require('./reviewModel.js')(sequelize, Sequelize);
db.feedback = require('./feedbackModel.js')(sequelize, Sequelize);

// db.feedback.hasOne(db.review, { as: 'review', foreignKey: 'id' });
db.feedback.hasOne(db.employee, { as: 'author', foreignKey: 'id' });

db.review.hasMany(db.feedback, { as: 'feedbacks' });
db.feedback.belongsTo(db.review, {
  foreignKey: 'id',
  as: 'review',
});

module.exports = db;
