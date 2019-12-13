const authController = require('../controllers/auth');

const routes = (router) => {

  router.get('/', authController.healthcheck);

  // log in
  router.post('/login', authController.login);

  // log out
  router.post('/log-out', (req, res) => {
    res.send({
      status : 'Todo'
    });
  });

  return router;
};

module.exports = routes;
