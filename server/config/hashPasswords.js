var crypto = require('crypto');

const hashPassword = (password) => {
    var salt = crypto.randomBytes(128).toString('base64');
    var iterations = 10000;
    var hash = crypto.pbkdf2Sync(password, salt, iterations, 512, 'sha512');
    return {
        salt: salt,
        hash: hash,
        iterations: iterations
    };
}

const isPasswordCorrect = (savedHash, savedSalt, savedIterations, passwordAttempt) => {
    return savedHash == pbkdf2(passwordAttempt, savedSalt, savedIterations);
};

module.exports = {
    hashPassword,
    isPasswordCorrect
};