var Twit = require('twit');
var T = new Twit(require(__dirname + '/../config.js'));

module.exports = exports = function(id, callback) {
  var followObj = {
    user_id: id
  };

  T.post('friendships/destroy', followObj, function(err, res) {
    if (err) throw (err);
    callback(null, res);
  });
};
