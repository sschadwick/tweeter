'use strict';

var express = require('express');
var jsonParser = require('body-parser').json();

var tweetRoute = module.exports = exports = express.Router();

// Following

tweetRoute.post('/follow', jsonParser, function(req, res) {
  require(__dirname + '/../lib/addFollow')(req, res);
});

tweetRoute.post('/unfollow', jsonParser, function(req, res) {
  require(__dirname + '/../lib/unFollow')(req, res);
});

// Tweeting

tweetRoute.post('/tweet', jsonParser, function(req, res) {
  require(__dirname + '/../lib/tweet')(req, res);
});

tweetRoute.post('/untweet/:tweetId', jsonParser, function(req, res) {
  require(__dirname + '/../lib/untweet')(req, res);
});

tweetRoute.post('/retweet/:tweetId', jsonParser, function(req, res) {
  require(__dirname + '/../lib/retweet')(req, res);
});

tweetRoute.post('/unretweet/:tweetId', jsonParser, function(req, res) {
  require(__dirname + '/../lib/unretweet')(req, res);
});

// Searching

tweetRoute.get('/search/:str', function(req, res) {
  require(__dirname + '/../lib/search')(res, res);
});
