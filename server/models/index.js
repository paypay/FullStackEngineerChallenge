const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = Promise;
mongoose.connect('<add-your-mongodb-connection-string-here>', {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	keepAlive: true
});

// <add your models here>
// Ex: module.exports.User = require('./user');
