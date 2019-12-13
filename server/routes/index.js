const routes = (router) => {
  router.get('/', function (req, res, next) {
    res.send('Healthcheck OK');
  });
  return router;
};

module.exports = routes;