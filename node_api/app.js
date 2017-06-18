
// ***************************************************************************************************************
//                                                SERVER
// ***************************************************************************************************************
// *** Connect to 'restify' package in '/node_modules/restify'
var restify = require('restify');
// *** Create local server
var server = restify.createServer();
// *** Import external files
var setupController = require('./controllers/setupController.js');
var userController = require('./controllers/userController.js');
// *** Define functions from the above external files
setupController(server,restify);
userController(server);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
