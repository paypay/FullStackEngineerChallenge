var $ = require('../util/System');
var auth = require('../config/auth');

var Employee = require('../models/employees');
var Login = require('../models/login');

var hashPwds = require('../config/hashPasswords');

var { Sequelize, sequelize } = require('../config/database');

sequelize.authenticate()
    .then(() => console.log('Connection established'))
    .catch((err) => console.error('Unable to connect to the database:', err));

let users = {
    'asantikari': '123456',
    'santikari': '654321'
};

const healthcheck = (req, res) => {
    res.send($.formatException('OK'));
};

const login = async (req, res) => {
    const { user_id, password } = req.body;

    if (!user_id || !password) {
        return res.send($.formatException('Missing mandatory fields'));
    }
    let result;
    try {
        result = await Login(sequelize, Sequelize.DataTypes).findOne({ where: { user_id } });
    } catch (e) {
        console.error(e);
    }
    if (!result) {
        return res.send($.formatException('User not found'));
    }

    if (!hashPwds.isPasswordCorrect(result.hash, result.salt, result.iteration, password)) {
        return res.send($.formatException('Passwords do not match'));
    }

    let token = auth.signToken(user_id);

    return res.send($.formatException('Authenticated', { 'token': token, 'user_type': result.type }));
};

const logout = (req, res) => {
    // todo: store a db to blacklist generated tokens so that logout can be achieved
    res.send($.formatException('Logged you Out. Bye Now!'))
};

// this is just an interface to create dummy data in db for users table
const signup = async (req, res, next) => {
    let { user_id, password, user_type } = req.body;

    if (!user_id || !password) {
        return res.send($.formatException('data not found'));
    }
    let { salt, hash, iterations } = hashPwds.hashPassword(req.body.password);
    let result;
    try {
        result = await Login(sequelize, Sequelize.DataTypes).create({
            user_id,
            salt,
            hash,
            type: user_type,
            iteration: iterations,
        });
    } catch (e) {
        console.error('exception', e);
    }
    res.send('Ok');
};

module.exports = {
    healthcheck,
    login,
    logout,
    signup,
};