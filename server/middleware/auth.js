const jwt = require('jsonwebtoken');

const HEADER_CHECK = /Bearer/;

// validate token from header Authorization: Bearer <token>
const validateToken = (req, res, next) => {

    let token = req.headers['Authorization'] || req.body.token;
    if (!token){
        res.status(403).send({
            status: 'Authentication not provided',
        });
    }
    let parts = token.split(' ');
    
    if (!HEADER_CHECK.test(parts[0])) {
        res.status(400).send({
            status: 'Bearer not provided'
        });
    }
    token = parts[1];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).send({
                    status: 'Invalid token provided'
                });
            }
            req.decoded = decoded;
            next();
        });
    } else {
        req.status(401).send({
            status: 'Auth token is not provided'
        });
    }
};


module.exports = validateToken;