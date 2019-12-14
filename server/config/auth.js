const jwt = require('jsonwebtoken');

// sign token
const signToken = (userid) => {
    let token = jwt.sign({_id: userid}, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
    return token;
};

module.exports = {
    signToken
};