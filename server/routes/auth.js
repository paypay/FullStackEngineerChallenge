const authController = require('../controllers/auth');

const routes = (router) => {

  router.get('/', authController.healthcheck);

  router.post('/login', authController.login);

  router.post('/logout', authController.logout);

  return router;
};

module.exports = routes;
