var crypto = require('crypto');

const hashPassword = (password) => {
    var salt = crypto.randomBytes(128).toString('base64');
    var iterations = 10000;
    // Refactor: async method to be used
    var hash = crypto.pbkdf2Sync(password, salt, iterations, 512, 'sha512');
    return {
        salt: salt,
        hash: hash.toString('hex'),
        iterations,
    };
};

const isPasswordCorrect = (savedHash, savedSalt, savedIterations, passwordAttempt) => {
    // Refactor: async method to be used
    let hashedValue = crypto.pbkdf2Sync(passwordAttempt, savedSalt, savedIterations, 512, 'sha512');
    return savedHash == hashedValue.toString('hex');
};

module.exports = {
    hashPassword,
    isPasswordCorrect
};