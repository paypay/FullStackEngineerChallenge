module.exports = (sequelize, Sequelize) => {
  const Review = sequelize.define('review', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
  });

  return Review;
};
