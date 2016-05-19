var Twit = require('twit');
var T = new Twit(require(__dirname + '/../config.js'));

module.exports = exports = function(status, callback) {
  var tweetObj = {
    status: status
  };

  T.post('statuses/update', tweetObj, function(err, res) {
    if (err) throw (err);
    callback(null, res);
  });
};
