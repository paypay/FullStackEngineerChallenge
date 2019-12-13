const routes = (router) => {
  /* GET home page. */
  router.get('/', function (req, res, next) {
    res.send('OK');
  });

  return router;
};

module.exports = routes;