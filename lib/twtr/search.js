module.exports = exports = function(req, res) {

  var responseHandler = require(__dirname + '/../response_handler');
  var errorHandler = require(__dirname + '/../error_handler');

  var Twit = require('twit');
  var T = new Twit({
    consumer_key: req.headers.consumer_key,
    consumer_secret: req.headers.consumer_secret,
    access_token: req.headers.access_token,
    access_token_secret: req.headers.access_token_secret
  });

  var searchObj = {
    q: req.body.str,
    count: 10,
    result_type: 'recent'
  };

  T.get('search/tweets', searchObj, function(err, data) {
    if (err) {
      errorHandler(err, res);
    } else {
      responseHandler.send200(res, data);
    }
  });
};
