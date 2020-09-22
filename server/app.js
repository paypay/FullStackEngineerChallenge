const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const logger = require('./services/logger');
const auth = require('./middleware/auth');

mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.set('useCreateIndex', true);

const app = express();
app.disable('x-powered-by');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(auth.authParser);
app.use((req, res, next) => {
  // Allows any origin for convenient, should only allow legitimate frontend origin in production
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') return res.json({ result: 'ok' });
  return next();
});

app.get('/', (req, res) => res.send('Hello World!'));
app.post('/login', require('./routes/login'));
app.use('/feedbacks', auth.isLoggedIn, require('./routes/feedbacks'));
app.use('/questions', auth.isLoggedIn, require('./routes/questions'));
app.use('/reviews', auth.isLoggedIn, require('./routes/reviews'));
app.use('/users', auth.isLoggedIn, require('./routes/users'));

const listener = app.listen(config.port, () => {
  logger.info(`Listening on port ${listener.address().port}!`);
});
