var Twit = require('twit');
var T = new Twit(require(__dirname + '/../config.js'));

module.exports = exports = function(screen_name, callback) {
  var followObj = {
    screen_name: screen_name,
  };

  T.post('friendships/destroy', followObj, function(err, res) {
    if (err) throw (err);
    callback(null, res);
  });
};
