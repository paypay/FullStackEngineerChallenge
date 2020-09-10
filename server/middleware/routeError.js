const { validationResult } = require('express-validator');

const routeError = (req, res, next) => {
	const errors = validationResult(req);
	!errors.isEmpty() ? res.status(400).json({ errors: errors.array() }) : next();
};

module.exports = routeError;
