
// ***************************************************************************************************************
//                                                CRUD API ROUTES
// ***************************************************************************************************************
// *** Import functions from helperFunctions.js
var helpers = require('../config/helperFunctions.js');
// *** Import our UserModel schema (users Collection in MLab)
var UserModel = require('../models/UserModel.js');

// *** Wrap routes in a function and make it available publicly - Exported to app.js
module.exports = function(server) {

// ************************** GET (all users) ******************************* //

    // *** HTTP Method GET - retreive all users  ***
    server.get("/", function(req,res,next) {
          // ** get users from datas posted on MongoDB (copied code from npmjs.com/mongoose)
          UserModel.find({}, function (err, users) {
                helpers.success(res, next, users);
            });
    });

// **************************** GET (one user) ******************************* //

    // *** HTTP Method GET - retreive particular user  ***
    server.get("/user/:id", function(req,res,next) {
          // *** activate restify-validator, require input.
          req.assert('id', "Id is required").notEmpty();
          var errors = req.validationErrors();
          if (errors) {
            helpers.failure(res, next, errors, 400); // Show first error if there are multiple errors. 400 error code: fields are  not passed-in correctly.
          }
          // ** get users from datas posted on MongoDB (copied code from npmjs.com/mongoose)
          UserModel.findOne({ _id: req.params.id }, function (err, user) {
            if(err) {
                helpers.failure(res, next, "Something went wrong when fetching the user", 500);
            }
            // set error message for non-existance user id - 404 is code for error.
            if (user === null) {
                helpers.failure(res, next, "The specified user id does not exist.", 404);
            }
                // if no error:
                helpers.success(res, next, user);
        });

    });

// ******************************* POST (create)****************************** //

    // *** HTTP Method POST - add a user  ***
    server.post("/user", function(req, res, next) {
          // *** input validation for all properties in each object params.
          req.assert('first_name', "First name is required").notEmpty();
          req.assert('last_name', "Last name is required").notEmpty();
          // *** .isEmail() is removed from below; validator is not working on Postman and created an error.
          req.assert('email_address', 'Email address is required and must be a valid email').notEmpty();
          req.assert('career', "Career is required. Must be either student, teacher, or professor").isIn(["student","teacher","professor"]);
          var errors = req.validationErrors();
          if (errors) {
            helpers.failure(res, next, errors, 400); // Show first error if there are multiple errors. 400 error code: fields are  not passed-in correctly.
          }
          // *** Replace Fake Databes: Create new UserModel instance & define parameters' values.Params are defined in UserModel's Schema.
          var user = new UserModel();
      		user.first_name = req.params.first_name;
      		user.last_name = req.params.last_name;
      		user.email_address = req.params.email_address;
      		user.career = req.params.career;
      		user.save(function (err) {
      			if (err) {
        				helpers.failure(res, next, errors, 500);
      			}
      			    helpers.success(res, next, user);
      		  });
    });

// ********************************* PUT (update) ***************************** //

    // *** HTTP Method PUT - update a user ***
    server.put("/user/:id", function(req,res,next) {
            // *** validation, require correct id.
            req.assert('id', "Id is required and must be numeric").notEmpty();
            var errors = req.validationErrors();
            if (errors) {
              helpers.failure(res, next, errors, 400); // Show first error if there are multiple errors. 400 error code: fields are  not passed-in correctly.
              return next();
            }
            // Find single user
            UserModel.findOne({ _id: req.params.id }, function (err, user) {
                if(err) {
                   helpers.failure(res, next, "Something went wrong when fetching the user", 500);
                }
                // set error message for non-existance user id - 404 is code for error.
                if (user === null) {
                    helpers.failure(res, next, "The specified user id does not exist.", 404);
                }
                // after we check the specified user can be found, set the updated user's params in "updates" object.
                var updates = req.params;
                // id is passed in, don't override
                delete updates.id;
                // ** loop through each user property and update old user data with new data.
                for (var field in updates) {
                    user[field] = updates[field];
                }
                // if error:
                user.save(function (err) {
            			   helpers.failure(res, next, errors, 500);
                });
                     // if no error:
                     helpers.success(res, next, user);
            });
    });

// ******************************* DELETE ************************************ //

    // *** HTTP Method DELETE - delete particular user ***
    server.del("/user/:id", function(req,res,next) {
            // *** validation, require correct id
            req.assert('id', "Id is required and must be numeric").notEmpty();
            var errors = req.validationErrors();
            if (errors) {
              helpers.failure(res, next, errors, 400); // Show first error if there are multiple errors. 400 error code: fields are  not passed-in correctly.
            }

            UserModel.findOne({ _id: req.params.id }, function (err, user) {
                if(err) {
                   helpers.failure(res, next, "Something went wrong when fetching the user", 500);
                }
                // set error message for non-existance user id - 404 is code for error.
                if (user === null) {
                    helpers.failure(res, next, "The specified user id does not exist.", 404);
                }
                // after we check the specified user can be found, remove/ delete user.
                // if error:
                user.remove(function (err) {
            			 helpers.failure(res, next, "Error removing user from database", 500);
                });
                   // if no error:
                   helpers.success(res, next, []);
            });
    });

}
