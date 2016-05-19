var Twit = require('twit');
var T = new Twit(require(__dirname + '/../config.js'));

module.exports = exports = function(screen_name, callback) {
  var followObj = {
    screen_name: screen_name,
    follow: true
  };

  T.post('friendships/create', followObj, function(err, res) {
    if (err) throw (err);
    callback(null, res);
  });
};
