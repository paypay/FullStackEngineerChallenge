/**
 * ReviewController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    addReview: function (req, res) {

        console.log("addReview");
        console.log(req.body);
        var userId = req.body.userId;
        var fromUserId = req.body.fromUserId;
        var comment = req.body.comment;
        var review = req.body.review;
        if (!userId) {

            return res.status(200).json({ status: 2, status_type: 'Failure', message: 'Please pass userId' });
        } else if (!fromUserId) {

            return res.status(200).json({ status: 2, status_type: 'Failure', message: 'Please pass fromUserId' });
        } else if (!comment) {

            return res.status(200).json({ status: 2, status_type: 'Failure', message: 'Please pass comment' });
        } else {
            var query = "SELECT * from review where userId = '" + userId + "' and fromUserId = '" + fromUserId + "' and status=1";
            Review.getDatastore().sendNativeQuery(query, function (err, records) {
                // check whether the username already exist
                if (err) {

                    return res.status(200).json({ status: 2, status_type: 'Failure', message: err })
                } else {
                    var jsonResult = records.rows;
                    if (jsonResult.length) {

                        return res.status(200).json({ status: 2, status_type: 'Failure', message: 'Review already done!' });

                    } else {
                        var param = {
                            userId: userId,
                            fromUserId: fromUserId,
                            comment: comment,
                            review: review,
                            status: true
                        }
                        console.log(param);
                        Review.update({ userId: userId, fromUserId: fromUserId }, param).exec(function (err, results) {
                            if (err) {
                                console.log(err);
                                return res.status(200).json({ status: 2, status_type: 'Failure', message: err });
                            } else {
                                return res.status(200).json({ status: 1, status_type: 'Successfully added review' });
                            }
                        });
                    }
                }
            });
        }

    },
    assignReviewer: function (req, res) {

        console.log("assignReviewer");
        console.log(req.body);
        var userId = req.body.userId;
        var fromUserId = req.body.fromUserId;
        if (!userId) {

            return res.status(200).json({ status: 2, status_type: 'Failure', message: 'Please pass userId' });
        } else if (!fromUserId) {

            return res.status(200).json({ status: 2, status_type: 'Failure', message: 'Please pass fromUserId' });
        } else {
            var query = "SELECT * from review where userId = '" + userId + "' and fromUserId = '" + fromUserId + "'";
            Review.getDatastore().sendNativeQuery(query, function (err, records) {
                // check whether the username already exist
                if (err) {

                    return res.status(200).json({ status: 2, status_type: 'Failure', message: err })
                } else {
                    var jsonResult = records.rows;
                    if (jsonResult.length) {

                        return res.status(200).json({ status: 2, status_type: 'Failure', message: 'Reviewer already set!' });

                    } else {
                        var param = {
                            userId: userId,
                            fromUserId: fromUserId,
                            status: false
                        }
                        console.log(param);
                        Review.create(param).exec(function (err, results) {
                            if (err) {
                                console.log(err);
                                return res.status(200).json({ status: 2, status_type: 'Failure', message: err });
                            } else {
                                return res.status(200).json({ status: 1, status_type: 'Successfully assigned reviewer' });
                            }
                        });
                    }
                }
            });

        }
    },
    listReview: function (req, res) {

        console.log("Get listReview");
        var id = req.param('id');
        var conQuery    =   "";
        if (id) {
            conQuery    =   "where r.userid= "+id;
        }
        var query = `SELECT r.userid, u.username, u.displayName as userdisplay, 
                r.fromUserId, ur.username as fromname, ur.displayName as fromdisplay, 
                r.comment, r.review, r.status from
                review r 
                LEFT JOIN user u 
                ON r.userid= u.id
                LEFT JOIN user ur 
                ON r.fromUserId= ur.id `+conQuery;
        Review.getDatastore().sendNativeQuery(query, function (err, results) {
            if (err) {

                return res.status(200).json({ status: 2, status_type: 'Failure', message: 'Some error in selecting user', error_details: err });
            } else {
                var jsonResult = results.rows;
                if (jsonResult.length) {
                    return res.status(200).json({ status: 1, status_type: 'Success', data: jsonResult });
                } else {
                    return res.status(200).json({ status: 1, status_type: 'Success', data: [] });

                }
            }
        });

    }
}

