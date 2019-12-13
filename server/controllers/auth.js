var $ = require('../util/System');
var auth = require('../config/auth');

let users = {
    'asantikari': '123456',
    'santikari': '654321'
};

const healthcheck = (req, res) => {
    res.send($.formatException('OK'));
};

const login = (req, res) => {
    const { userid, password } = req.body;

    if (!userid || !password) {
        res.send($.formatException('Missing mandatory fields'));
    }

    if (!users[userid]) {
        // compare passwords using crypto
        res.send($.formatException('User not found'));
    }

    if (password !== users[userid]) {
        res.send($.formatException('Passwords do not match'));
    }

    let token = auth.signToken(userid);

    res.send($.formatException('Authenticated',{ 'token': token }));
};

const logout = (req, res) => {
    // todo: store a db to blacklist generated tokens so that logout can be achieved
    res.send($.formatException('Logged you Out. Bye Now!'))
}

module.exports = {
    healthcheck,
    login,
    logout
};