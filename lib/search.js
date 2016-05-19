var Twit = require('twit');
var T = new Twit(require(__dirname + '/../config.js'));

module.exports = exports = function(search, callback) {
  var searchObj = {
    q: search,
    count: 10,
    result_type: 'recent'
  };

  T.get('search/tweets', searchObj, function(err, res) {
    if (err) throw (err);
    callback(null, res);
  });
};
