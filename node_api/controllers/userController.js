
// ***************************************************************************************************************
//                                                CRUD API ROUTES
// ***************************************************************************************************************
// *** Import functions from helperFunctions.js
var helpers = require('../config/helperFunctions.js');
// *** Fake Datebase
var users = {};
var max_user_id = 0;
// *** Wrap routes in a function and make it available publicly - Exported to app.js
module.exports = function(server) {

// ************************** GET (all users) ******************************* //

    // *** HTTP Method GET - retreive all users  ***
    server.get("/", function(req,res,next) {
    // SHORT VERSION (use function)//
      helpers.success(res, next, users);
      return next();
    });

// **************************** GET (one user) ******************************* //

    // *** HTTP Method GET - retreive particular user  ***
    server.get("/user/:id", function(req,res,next) {
      // *** activate restify-validator, require correct id.
        req.assert('id', "Id is required and must be numeric").notEmpty().isInt();
        var errors = req.validationErrors();
        if (errors) {
          helpers.failure(res, next, errors[0], 400); // Show first error if there are multiple errors. 400 error code: fields are  not passed-in correctly.
        }
      // set error message for non-existance user id - 404 is code for error.
      if (typeof(users[req.params.id]) === 'undefined') {
        helpers.failure(res, next, "The specified user id does not exist.", 404);
        return next();
      }
    //  SHORT VERSION //
      helpers.success(res, next, users[parseInt(req.params.id)]);
      return next();
    });

// ******************************* POST (create)****************************** //

    // *** HTTP Method POST - add a user  ***
    server.post("/user", function(req, res, next) {
      // *** input validation for all properties in each object params.
      req.assert('first_name', "First name is required").notEmpty();
      req.assert('last_name', "Last name is required").notEmpty();
      req.assert('email_address', "Email address is required and must be a valid email").notEmpty().isEmail();
      req.assert('career', "Career is required. Must be either student, teacher, or professor").isIn(["student","teacher","professor"]);
      var errors = req.validationErrors();
      if (errors) {
        helpers.failure(res, next, errors, 400); // Show first error if there are multiple errors. 400 error code: fields are  not passed-in correctly.
      }
      // ** the http request that comes in will define our new user
      var user = req.params;
      // ** increment user.
      max_user_id++;
      // ** set new user id.
      user.id = max_user_id;
      // ** add the user to array of users.
      users[user.id] = user;
    // SHORT VERSION //
      helpers.success(res, next, user);
      return next();
    });

// ********************************* PUT (update) ***************************** //

    // *** HTTP Method PUT - update a user ***
    server.put("/user/:id", function(req,res,next) {
      // *** validation, require correct id.
      req.assert('id', "Id is required and must be numeric").notEmpty().isInt();
      var errors = req.validationErrors();
      if (errors) {
        helpers.failure(res, next, errors[0], 400); // Show first error if there are multiple errors. 400 error code: fields are  not passed-in correctly.
      }
      // set error message for non-existance user id - 404 is code for error.
      if (typeof(users[req.params.id]) === 'undefined') {
        helpers.failure(res, next, "The specified user id does not exist.", 404);
        return next();
      }
      // ** set "user" as requested user.
      var user = users[parseInt(req.params.id)];
      // ** set the updated user's params in "updates" object.
      var updates = req.params;
      // ** loop through each user property and update old user data with new data.
      for (var field in updates) {
        user[field] = updates[field];
      }
      // SHORT VERSION  //
      helpers.success(res, next, user);
      return next();
    });

// ******************************* DELETE ************************************ //

    // *** HTTP Method DELETE - delete particular user ***
    server.del("/user/:id", function(req,res,next) {
      // *** validation, require correct id
      req.assert('id', "Id is required and must be numeric").notEmpty().isInt();
      var errors = req.validationErrors();
      if (errors) {
        helpers.failure(res, next, errors[0], 400); // Show first error if there are multiple errors. 400 error code: fields are  not passed-in correctly.
      }
      // set error message for non-existance user id - 404 is code for error.
      if (typeof(users[req.params.id]) === 'undefined') {
        helpers.failure(res, next, "The specified user id does not exist.", 404);
        return next();
      }
      // ** delete requested user
      delete users[parseInt(req.params.id)];
      //  SHORT VERSION  //
      helpers.success(res, next, []);
      return next();
    });

}
