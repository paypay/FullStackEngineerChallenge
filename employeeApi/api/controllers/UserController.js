/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var crypto = require('crypto');
module.exports = {
    TestFunction: function(req, res) {
        res.send('hello');
    },
    login: function(req, res){
        var token;
        console.log("Login Controller");
        console.log(req.allParams());
        var username    =   req.param('username');
        var password    =   req.param('password');
        // var tokenExpiry =   req.options.settingsKeyValue.TOKEN_EXPIRY_HOUR;
		if(!username){
            return res.json(200, {status: 2, status_type: 'Failure' , message: 'Please pass username'});
        }else if(!password){
            return res.json(200, {status: 2, status_type: 'Failure' , message: 'Please pass password'});
        }else{
			var conQuery     =   '';
			var encryptPass =   crypto.createHash('md5').update(password).digest("hex");
            var conQuery    =   "username = '"+username+"' && password = '"+encryptPass+"'";
			var query       =   "SELECT * from user where "+conQuery;

			User.getDatastore().sendNativeQuery(query, function(err, results) {
				if (err) {
					
					return res.status(200).json({status: 2, status_type: 'Failure' ,message: 'Some error in selecting user', error_details: err});
				}else{
                    var jsonResult  =   results.rows;
                    console.log(jsonResult);
					if(jsonResult.length){
						return res.status(200).json({status: 1, status_type: 'Success', message: 'Successfully login', data :   jsonResult });
					} else {
						return res.status(200).json({status: 2, status_type: 'Failure' ,  message:  'Invalid login crendentials'});

					}
				}
			});
			  
		}	
   },
   getEmployees: function(req, res){
    var token;
    console.log("Get Emp Controller");
    console.log(req.allParams());
        var conQuery    =   "userType = 'user'";
        var query       =   "SELECT * from user where "+conQuery;
        User.getDatastore().sendNativeQuery(query, function(err, results) {
            if (err) {
                
                return res.status(200).json({status: 2, status_type: 'Failure' ,message: 'Some error in selecting user', error_details: err});
            }else{
                var jsonResult  =   results.rows;
                if(jsonResult.length){
                    return res.status(200).json({status: 1, status_type: 'Success', data :   jsonResult });
                } else {
                    return res.status(200).json({status: 1, status_type: 'Success' , data :   [] });

                }
            }
        });
	
}

};

