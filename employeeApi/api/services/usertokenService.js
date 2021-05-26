var crypto = require('crypto');
module.exports = {
        /*  =================================================================================================================================
                    Function to create new token
            ================================================================================================================================== */
        createToken: function (userId, token_expiry_hour, callback) {
                console.log("user token >>>>>>>>>>");

                var expiry_date = new Date(new Date().getTime() + (token_expiry_hour * 1000 * 60 * 60));
                var token = crypto.randomBytes(12).toString('hex');
                var tokenValues = {
                        userId: userId,
                        token: token,
                        expiryDate: expiry_date
                };
                console.log("tokenValues------------------------------------------");
                console.log(tokenValues);
                UserToken.create(tokenValues).exec(function (err, resultToken) {
                        if (err) {
                                console.log("Error Create Token Response");
                                console.log(err);
                                callback(true, { status: 2, status_type: "Failure", message: 'Some error occured in create token service', error_details: err });
                        } else {
                                console.log("Success Create Token Response");
                                callback(false, { status: 1, status_type: "Success", message: 'CreateToken service success', token: resultToken });
                        }
                });
        },

        /*  =================================================================================================================================
                    Function to delete a token
            ================================================================================================================================== */
        deleteToken: function (token, userId, callback) {
                UserToken.destroy({ token: token, userId: userId }).exec(function (err, results) {
                        if (err) {
                                callback(true, { status: 2, status_type: "Failure", message: 'Some error occured in delete token query', error_details: err });
                        } else {
                                console.log("deleted Successfully");
                                callback(false, { status: 1, status_type: "Success", message: 'DeleteToken service success' });
                        }
                });
        },


        /*  =================================================================================================================================
                Function to check whether a token is expired or not
            ================================================================================================================================== */
        checkToken: function (token, callback) {
                var today = new Date().toISOString();
                var query = " SELECT usr.id, usr.username, " +
                        " usrtkn.userId, usrtkn.token, usrtkn.expiryDate" +
                        " FROM" +
                        " userToken usrtkn" +
                        " INNER JOIN user usr ON usr.id = usrtkn.userId" +
                        " WHERE usrtkn.token = '" + token + "' AND usrtkn.expiryDate > '" + today + "'";
                //console.log("check token ----------------------query");
                //console.log(query);
                UserToken.query(query, function (err, results) {
                        if (err) {
                                console.log(err);
                                callback(true, { status: 2, status_type: "Failure", message: 'Some error occured in check token query', error_details: err });
                        } else {
                                if (results.length == 0) {
                                        callback(false, { status: 2, status_type: "Failure", message: 'token' });
                                } else {
                                        User.findOne({ id: results[0].userId }).exec(function (err, statusResults) {
                                                if (err) {
                                                        console.log(err);
                                                        callback(true, { status: 2, status_type: 'Failure', message: 'Some error occured in checking user status', error_details: err });
                                                } else {
                                                        callback(false, { status: 1, status_type: "Success", message: 'Valid token and active user', tokenDetails: results[0] });

                                                }
                                        });
                                }
                        }
                });
        }
};
