require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();
var router = express.Router();

var authMiddleware = require('./middleware/auth');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var performaceRouter = require('./routes/performanceReview');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter(router));
app.use('/auth', authRouter(router));

// authenticated routes
app.use('/performance', /* authMiddleware, */ performaceRouter(router));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).send({ description: err.message });
});

module.exports = app;
