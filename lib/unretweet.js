var Twit = require('twit');
var T = new Twit(require(__dirname + '/../config.js'));

module.exports = exports = function(tweetId, callback) {
  T.post('statuses/unretweet/' + tweetId, {}, function(err, res) {
    if (err) throw (err);
    callback(null, res);
  });
};
