var auth = require('../config/auth');

let users = {
    'asantikari': '123456',
    'santikari': '654321'
};

const healthcheck = (req, res) => {
    res.send({ status: 'OK' });
};

const login = (req, res) => {
    const { userid, password } = req.body;

    if (!userid || !password) {
        res.send({
            status: 'Missing mandatory fields'
        });
    }

    if (!users[userid]) {
        // compare passwords using crypto
        res.send({
            status: 'User not found'
        });
    }

    if (password !== users[userid]) {
        res.send({
            status: 'Passwords do not match'
        });
    }

    let token = auth.signToken(userid);

    res.send({
        status: 'Authenticated',
        token,
    });
}

module.exports = {
    healthcheck,
    login,
};