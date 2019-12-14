module.exports = (sequelize, DataTypes) => {
    const PerformanceReviewAssignment = sequelize.define('performance_review_assignment', {
        candidate: {
            type: DataTypes.STRING,
            unique: true,
        },
        reviewer: {
            type: DataTypes.STRING,
            notNull: true,
        },
        reviewed: {
            type: DataTypes.BOOLEAN,
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

    return PerformanceReviewAssignment;
}