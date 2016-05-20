'use strict';

var express = require('express');
var jsonParser = require('body-parser').json();
var responseHandler = require(__dirname + '/../lib/response_handler');
var errorHandler = require(__dirname + '/../lib/error_handler');

var tweetRoute = module.exports = exports = express.Router();

// Searching

tweetRoute.get('/search/:str', function(req, res) {
  require(__dirname + '/../lib/search')(req.params.str, function(err, data) {
    if (err) { errorHandler.err500(err, data); }
    responseHandler.send200(res, data);
  });
});

// Following

tweetRoute.post('/follow/:id', jsonParser, function(req, res) {
  require(__dirname + '/../lib/addFollow2')(req, res);
});

tweetRoute.post('/unfollow/:id', jsonParser, function(req, res) {
  require(__dirname + '/../lib/unFollow')(req.params.id, function(err, data) {
    if (err) { errorHandler.err500(err, data); }
    responseHandler.send200(res, data);
  });
});

// Tweeting

tweetRoute.post('/tweet', jsonParser, function(req, res) {
  require(__dirname + '/../lib/tweet2')(req, res);
});

tweetRoute.post('/untweet/:tweetId', jsonParser, function(req, res) {
  require(__dirname + '/../lib/untweet')(req.params.tweetId, function(err, data) {
    if (err) { errorHandler.err500(err, data); }
    responseHandler.send200(res, data);
  });
});

tweetRoute.post('/retweet/:tweetId', jsonParser, function(req, res) {
  require(__dirname + '/../lib/retweet')(req.params.tweetId, function(err, data) {
    if (err) { errorHandler.err500(err, data); }
    responseHandler.send200(res, data);
  });
});

tweetRoute.post('/unretweet/:tweetId', jsonParser, function(req, res) {
  require(__dirname + '/../lib/unretweet')(req.params.tweetId, function(err, data) {
    if (err) { errorHandler.err500(err, data); }
    responseHandler.send200(res, data);
  });
});
