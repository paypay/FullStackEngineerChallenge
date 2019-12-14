var PrfReviewCtrl = require('../controllers/performance');

const routes = (router) => {

    router.get('/', (req, res) => {
        res.send('Ok');
    });

    router.post('/createReview', PrfReviewCtrl.createReview);

    router.post('/viewPerformanceReview', PrfReviewCtrl.viewPerformanceReview)

    return router;
}


module.exports = routes;