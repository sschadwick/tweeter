module.exports = exports = function(req, res) {

  var responseHandler = require(__dirname + '/response_handler');
  var errorHandler = require(__dirname + '/error_handler');

  var Twit = require('twit');
  var T = new Twit({
    consumer_key: req.body.consumer_key,
    consumer_secret: req.body.consumer_secret,
    access_token: req.body.access_token,
    access_token_secret: req.body.access_token_secret
  });

  var searchObj = {
    q: req.params.str,
    count: 10,
    result_type: 'recent'
  };

  T.post('search/tweets', searchObj, function(err, data) {
    if (err) {
      switch (err.statusCode) {
        case 400:
          errorHandler.badRequest(err, res);
          break;
        case 401:
          errorHandler.unauthorized(err, res);
          break;
        case 403:
          errorHandler.forbidden(err, res);
          break;
        case 404:
          errorHandler.notFoundError(err, res);
          break;
        default:
          errorHandler.internalServerError(err, res);
      }
    } else {
      responseHandler.send200(res, data);
    }
  });
};
