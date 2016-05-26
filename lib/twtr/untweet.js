module.exports = exports = function(req, res) {

  var responseHandler = require(__dirname + '/../response_handler');
  var errorHandler = require(__dirname + '/../error_handler');

  var Twit = require('twit');
  var T = new Twit({
    consumer_key: req.body.consumer_key,
    consumer_secret: req.body.consumer_secret,
    access_token: req.body.access_token,
    access_token_secret: req.body.access_token_secret
  });

  T.post('statuses/destroy/' + req.params.tweetId, {}, function(err, data) {
    if (err) {
      errorHandler(err, res);
    } else {
      responseHandler.send200(res, data);
    }
  });
};