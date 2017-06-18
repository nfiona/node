// ***************************************************************************************************************
//                                                FUNCTIONS
// ***************************************************************************************************************

// *** DRY-ing repetitive API calls Methods by using functions.
function respond(res, next, status, data, http_code) {
  // res
  var response = {
    'status': status,
    'data': data
  };
  // data
  res.setHeader('content-type','application/json');
  // status & http_code
  res.writeHead(http_code);
  res.end(JSON.stringify(response));
  // next
  return next();
}

function success(res, next, data) {
  respond(res, next, 'success', data, 200);
}

function failure(res, next, data, http_code) {
  respond(res, next, 'failure', data, http_code);
}

// ***************************************************************************************************************
//                                                SERVER & DEPENDENCIES
// ***************************************************************************************************************

// *** Connect to 'restify' package in '/node_modules/restify'
var restify = require('restify');
// *** Dependency Injection(req, res, next)
// function respond(req, res, next) {
//   res.send('hihihi ' + req.params.name);
//   next();
// }
// *** Create local server
var server = restify.createServer();
// server.get('/myget/:name', respond);
// server.post('/mypost/:name', respond);

// *** RESTIFY DEPENDENCIES ***
server.use(restify.acceptParser(server.acceptable));
// *** Received urlencoded data (See postman-post request- body- code) Checkout Resfity Cheat Sheet for more...
server.use(restify.bodyParser());
server.use(restify.queryParser());

// ***************************************************************************************************************
//                                                CRUD API CALLS
// ***************************************************************************************************************

var users = {};
var max_user_id = 0;

 // ************************ GET (all users) ******************************* //

// *** HTTP Method GET - retreive all users  ***
server.get("/", function(req,res,next) {
  // // LONG VERSION //
  //     // *** set content-type
  //     res.setHeader('content-type','application/json');
  //     // *** standard RESTful API: 200 means succesfull.
  //     res.writeHead(200);
  //     // *** return entire database of users
  //     res.end(JSON.stringify(users));
  //     // *** closing function tp ensure no further execution takes place - go to the next part of execution
  //     return next();

  // SHORT VERSION (use function)//
      success(res, next, users);
})


// **************************** GET (one user) ******************************* //


 // *** HTTP Method GET - retreive particular user  ***
     server.get("/user/:id", function(req,res,next) {
      // set error message for non-existance user id - 404 is code for error.
      if (typeof(users[req.params.id]) === 'undefined') {
        failure(res, next, "The specified user id does not exist.", 404)
      }
      //  //  LONG VERSION //
      //     res.setHeader('content-type','application/json');
      //     res.writeHead(200);
      //     // *** return particular user
      //     res.end(JSON.stringify(users[parseInt(req.params.id)]));
      //     // *** closing function tp ensure no further execution takes place - go to the next part of execution
      //     return next();

       //  SHORT VERSION //
          success(res, next, users[parseInt(req.params.id)])
      })


// ******************************* POST ************************************** //


// *** HTTP Method POST - add a user  ***
server.post("/user", function(req, res, next) {
  // ** the http request that comes in will define our new user
  var user = req.params;
  // ** increment user.
  max_user_id++;
  // ** set new user id.
  user.id = max_user_id;
  // ** add the user to array of users.
  users[user.id] = user;

  //  LONG VERSION  //
      res.setHeader('content-type','application/json');
      res.writeHead(200);
      // ***single user.
      res.end(JSON.stringify(user));
      return next();

  // SHORT VERSION //
      succes(res, next, user);
})


// ********************************* PUT ************************************* //

// *** HTTP Method PUT - update a user ***
server.put("/user/:id", function(req,res,next) {
  // set error message for non-existance user id - 404 is code for error.
  if (typeof(users[req.params.id]) === 'undefined') {
    failure(res, next, "The specified user id does not exist.", 404)
  }
  // ** set "user" as requested user.
  var user = users[parseInt(req.params.id)];
  // ** set the updated user's params in "updates" object.
  var updates = req.params;
  // ** loop through each user property and update old user data with new data.
  for (var field in updates) {
    user[field] = updates[field];
  }

  // //  LONG VERSION  //
  //   res.setHeader('content-type','application/json');
  //   res.writeHead(200);
  //   // *** respond updated user.
  //   res.end(JSON.stringify(user));
  //   return next();

  // SHORT VERSION  //
  success(res, next, user)
})

// ******************************* DELETE ************************************ //

// *** HTTP Method DELETE - delete particular user ***
server.del("/user/:id", function(req,res,next) {
  // set error message for non-existance user id - 404 is code for error.
  if (typeof(users[req.params.id]) === 'undefined') {
    failure(res, next, "The specified user id does not exist.", 404)
  }
  // ** delete requested user
  delete users[parseInt(req.params.id)]

  // //  LONG VERSION  //
  //   res.setHeader('content-type','application/json');
  //   res.writeHead(200);
  //   // *** return
  //   res.end(JSON.stringify(true));
  //   // *** closing function to ensure no further execution takes place - go to the next part of execution
  //   return next();

  //  SHORT VERSION  //
    success(res, next, [])
})

// *******************************************************************************************************************

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
