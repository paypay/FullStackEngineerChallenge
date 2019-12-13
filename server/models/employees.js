module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('employees', {
        emp_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        emp_name: {
            type: DataTypes.STRING,
            notNull: true,
        },
        user_id: {
            type: DataTypes.STRING,
            notNull: true,
        },
        dob: {
            type: DataTypes.DATE,
        }
    }, { freezeTableName: true, timestamps: false });

    return Post;
}