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

}
