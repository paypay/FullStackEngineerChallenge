const routes = (router) => {

    router.get('/', (req, res) => {
        res.send('Ok');
    });

    return router;
}


module.exports = routes;