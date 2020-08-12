module.exports = (sequelize, Sequelize) => {
  const Feedback = sequelize.define('feedback', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    score: {
      type: Sequelize.INTEGER,
    },
    content: {
      type: Sequelize.TEXT,
    },
  });

  return Feedback;
};
