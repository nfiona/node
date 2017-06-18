// ***************************************************************************************************************
//                                                FUNCTIONS
// ***************************************************************************************************************

// *** DRY-ing repetitive API calls Methods by using functions
// *** Local function ("_")
function _respond(res, next, status, data, http_code) {
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
  // return next();
}

//  *** Make functions publicly available w/ module.exports - These are exported to userController.js
module.exports.success = function success(res, next, data) {
  _respond(res, next, 'success', data, 200);
}

module.exports.failure = function failure(res, next, data, http_code) {
  _respond(res, next, 'failure', data, http_code);
}
