var Twit = require('twit');
var T = new Twit(require(__dirname + '/../config.js'));
var addFollow = require(__dirname + '/addFollow');

module.exports = exports = function(id, callback) {
  T.get('followers/ids', {user_id: id}, function(err, res) {
    if (err) throw (err);
    var following = [];
    for (var i in res.ids) {
      following.push(res.ids[i].toString());
      addFollow(res.ids[i].toString(), function(err, data) {
        // console.log('Now following :' + res.ids[i]);
      });
    }

    callback(null, following);
  });
};