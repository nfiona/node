// ***************************************************************************************************************
//                                                CONFIGURE SERVER
// ***************************************************************************************************************
// *** Make it available publicly - Exported to app.js
module.exports = function(server, restify, restifyValidator) {
  // *** RESTIFY DEPENDENCIES ***
  server.use(restify.acceptParser(server.acceptable));  // *** Received urlencoded data (See postman-post request- body- code) Checkout Resfity Cheat Sheet for more...
  server.use(restify.bodyParser());
  server.use(restify.queryParser());
  // *** restify-validator plugin.
  server.use(restifyValidator);
  // Parse HTTP Basic Access Authentication for {'username': 'password'}
  server.use(restify.authorizationParser());
  // Use anonymous function for error handling
  server.use(function(req, res, next) {
    var apiKeys = {
      "user1": "ahsdh767aksjdbkjsabd67asd"
    };
    // Set condition: if authorization returns undefined, OR if username doesn't exit in the apiKeys array OR if password doesn't match the username stored in the apiKeys array,
    // then, send error message. Otherwise, proceed.
    if (typeof(req.authorization.basic) === 'undefined' || !apiKeys[req.authorization.basic.username] || req.authorization.basic.password !== apiKeys[req.authorization.basic.username]) {
      var response = {
        "status": "failure",
        "data": "Must specify a valid API Key."
      }
      // Borrow from helper funtion, sending our responses
      res.setHeader('content-type','application/json');
      res.writeHead(http_code); // forbidden error code.
      res.end(JSON.stringify(response));
      // return next();
    }
    return next();
  })
}
