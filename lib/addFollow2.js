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

  var followObj = {
    user_id: req.params.id,
    follow: true
  };

  T.post('friendships/create', followObj, function(err, data) {
    if (err) errorHandler.err500(err, data);
    responseHandler.send200(res, data);
  });
};
