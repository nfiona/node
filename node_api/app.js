
// *** Connect to 'restify' package in '/node_modules/restify'
var restify = require('restify');
// *** Create local server
var server = restify.createServer();
// *** Import external files & plugins
var setupController = require('./controllers/setupController.js');
var userController = require('./controllers/userController.js');
var restifyValidator = require('restify-validator');
var config = require("./config/dbConnections.js")
// connecting to MongoDB (MLab) with mongoose.
var mongoose = require('mongoose');
mongoose.connect(config.getMongoConnection());
// *** Define functions from the above external files & plugins
setupController(server, restify, restifyValidator);
userController(server);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
