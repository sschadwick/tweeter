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

  var followObj = {
    user_id: req.params.id,
    follow: true
  };

  T.get('followers/ids', followObj, function(err, res) {
    var following = [];
    for (var i in res.ids) {
      following.push(res.ids[i].toString());
      addFollow(res.ids[i].toString(), function(err, data) {
      });
    }

    if (err) {
      return errorHandler(err, res);
    } else {
      responseHandler(res, following);
    }
  });
};
