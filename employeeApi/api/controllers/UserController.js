/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var crypto = require('crypto');
module.exports = {
    login: function (req, res) {
        var token;
        console.log("Login Controller");
        console.log(req.allParams());
        var username = req.param('username');
        var password = req.param('password');
        // var tokenExpiry =   req.options.settingsKeyValue.TOKEN_EXPIRY_HOUR;
        if (!username) {
            return res.status(200).json({ status: 2, status_type: 'Failure', message: 'Please pass username' });
        } else if (!password) {
            return res.status(200).json({ status: 2, status_type: 'Failure', message: 'Please pass password' });
        } else {
            var conQuery = '';
            var encryptPass = crypto.createHash('md5').update(password).digest("hex");
            var conQuery = "username = '" + username + "' && password = '" + encryptPass + "'";
            var query = "SELECT * from user where " + conQuery;

            User.getDatastore().sendNativeQuery(query, function (err, results) {
                if (err) {

                    return res.status(200).json({ status: 2, status_type: 'Failure', message: 'Some error in selecting user', error_details: err });
                } else {
                    var jsonResult = results.rows;
                    console.log(jsonResult);
                    if (jsonResult.length) {
                        return res.status(200).json({ status: 1, status_type: 'Success', message: 'Successfully login', data: jsonResult });
                    } else {
                        return res.status(200).json({ status: 2, status_type: 'Failure', message: 'Invalid login crendentials' });

                    }
                }
            });

        }
    },
    getEmployees: function (req, res) {
        var token;
        console.log("Get Emp Controller");
        console.log(req.allParams());
        var conQuery = "userType = 'user'";
        var query = "SELECT * from user where " + conQuery;
        User.getDatastore().sendNativeQuery(query, function (err, results) {
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

    },
    addEmployee: function(req, res){
                
        console.log("addEmployee");
        console.log(req.body);
        var username            =   req.body.username;
        var displayName         =   req.body.displayName;
        var password            =   req.body.password;
        if( !username){
            
            return res.status(200).json({status: 2, status_type: 'Failure' , message: 'Please pass username'});
        }else if( !password){
            
            return res.status(200).json({status: 2, status_type: 'Failure' , message: 'Please pass password'});
        }else if(!displayName){
            
            return res.status(200).json({status: 2, status_type: 'Failure' , message: 'Please pass displayName'});
        }else {
            var query       =   "SELECT * from user where username = '"+username+"'";
            User.getDatastore().sendNativeQuery(query, function(err, records) {
            // check whether the username already exist
                if(err){
                    
                    return res.status(200).json({status: 2, status_type: 'Failure', message: err})
                }else{
                    var jsonResult = records.rows;
                    if (jsonResult.length) {
                            
                        return res.status(200).json({status: 2, status_type: 'Failure', message: 'Account already register with smae username!'});
                        
                    }else{
                       if(password){
                            var encryptPass     =   crypto.createHash('md5').update(password).digest("hex");
                        } 
                        var param       =   {
                            username            :   username,
                            password            :   encryptPass,
                            displayName         :   displayName,
                            userType            :   'user'
                        }
                        console.log(param);
                        User.create(param).exec(function (err, results) {
                            if(err){
                                console.log(err);
                                return res.status(200).json({status: 2, status_type: 'Failure', message:err});
                            }else{
                                return res.status(200).json({status: 1, status_type:'Successfully created a employee'});
                            }
                        });
                    }
                }
            });
        }
    },
    updateEmployee: function(req, res) {
        console.log("updateEmployee");
        console.log(req.body);
        var userId            =   req.body.userid;
        var displayName       =   req.body.displayName;
        if( !userId){
            
            return res.status(200).json({status: 2, status_type: 'Failure' , message: 'Please pass userid'});
        }else if( !displayName){
            
            return res.status(200).json({status: 2, status_type: 'Failure' , message: 'Please pass displayName'});
        }else {
            var param   =   {
                displayName      :   displayName
            };
            User.update({id:userId},param).exec(function (err, results) {
                if(err){
                    console.log(err);
                    return res.status(200).json({status: 2, status_type: 'Failure', message: err});
                }else{
                    return res.status(200).json({status: 1, status_type: 'Successfully updated'});
                }
            });
        } 
    },
    deleteEmployee: function(req, res){

        console.log("Delete Employee");
        var userId     =   req.body.userid;
        if(!userId){    
                return res.status(200).json({status:2, status_type: 'Failure', message: 'Please Pass userid'});
        }else{
            var param   =   {
                id :   userId,
            };
            User.destroy(param).exec(function (err, result) {
                if(err){
                    return res.status(200).json({status: 2, status_type: 'Failure' ,message: 'Some error occured: '+err});
                }else{
                    return res.status(200).json({status: 1, status_type: 'Success' , message: 'Employee deleted!!'});
                }
            });
        }
    }
};

