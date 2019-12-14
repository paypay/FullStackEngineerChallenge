module.exports = (sequelize, DataTypes) => {
    const Login = sequelize.define('login', {
        user_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true,
        },
        salt: {
            type: DataTypes.TEXT,
            notNull: true,
        },
        hash: {
            type: DataTypes.TEXT,
        },
        iteration: {
            type: DataTypes.INTEGER,
        },
        type: {
            type: DataTypes.STRING,
        }
    }, { freezeTableName: true, timestamps: false });

    return Login;
}