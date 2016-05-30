var eat = require('eat');
var User = require(__dirname + '/../models/user');
var errorHandler = require(__dirname + '/error_handler');

module.exports = exports = function(req, res, next) {
  var encryptedToken = req.headers.token ||
      (req.headers.cookie ? decodeURIComponent(req.headers.cookie.slice(6)) : '') ||
      (req.body ? req.body.token : undefined);
  if (!encryptedToken) {
    return errorHandler(null, res);
  }
  eat.decode(encryptedToken, process.env.APP_SECRET, function(err, token) {
    if (err) { return errorHandler(err, res); }

    User.findOne({_id: token.id}, function(err, user) {
      if (err) { return errorHandler(err, res); }
      if (!user) { return errorHandler(null, res); }
      req.user = user;
      next();
    });
  });
};
