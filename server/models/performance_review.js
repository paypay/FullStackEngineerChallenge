module.exports = (sequelize, DataTypes) => {
    const PerformanceReview = sequelize.define('performance_review', {
        candidate: {
            type: DataTypes.STRING,
            unique: true,
        },
        reviewer: {
            type: DataTypes.STRING,
            notNull: true,
        },
        points: {
            type: DataTypes.INTEGER,
        },
        comments: {
            type: DataTypes.TEXT,
        },
        created_by: {
            type: DataTypes.STRING,
        },
        created_datetime: {
            type: DataTypes.DATE,
        },
        last_updated_by: {
            type: DataTypes.STRING,
        },
        last_updated_datetime: {
            type: DataTypes.DATE,
        }
    }, { freezeTableName: true, timestamps: false });

    PerformanceReview.removeAttribute('id');

    return PerformanceReview;
}