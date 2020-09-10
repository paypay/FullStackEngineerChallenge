const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8081;
const notFoundController = require('./controllers/notFound');
const errorController = require('./controllers/error');

// configurations
app.use(cors());
app.use(bodyParser.json());

// normal routes
// <add your routes here>

// error routes
app.use(notFoundController);
app.use(errorController);

// server startup
app.listen(PORT, () => {
	console.log(`Server has started on port ${PORT}`);
});
