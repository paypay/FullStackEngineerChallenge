const errorController = (error, req, res, next) => {
	return res.status(error.status || 500).json({
		error: {
			message: error.message || 'Oops! An error occurred.'
		}
	});
};

module.exports = errorController;
