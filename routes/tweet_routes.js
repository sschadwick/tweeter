'use strict';

var express = require('express');
var jsonParser = require('body-parser').json();

var tweetRoute = module.exports = exports = express.Router();

// Searching

tweetRoute.get('/search/:str', function(req, res) {
  require(__dirname + '/../lib/search')(req, res);
});

// Following

tweetRoute.post('/follow/:id', jsonParser, function(req, res) {
  require(__dirname + '/../lib/addFollow2')(req, res);
});

tweetRoute.post('/unfollow/:id', jsonParser, function(req, res) {
  require(__dirname + '/../lib/unFollow2')(req, res);
});

// Tweeting

tweetRoute.post('/tweet', jsonParser, function(req, res) {
  require(__dirname + '/../lib/tweet2')(req, res);
});

tweetRoute.post('/untweet/:tweetId', jsonParser, function(req, res) {
  require(__dirname + '/../lib/untweet2')(req, res);
});

tweetRoute.post('/retweet/:tweetId', jsonParser, function(req, res) {
  require(__dirname + '/../lib/retweet2')(req, res);
});

tweetRoute.post('/unretweet/:tweetId', jsonParser, function(req, res) {
  require(__dirname + '/../lib/unretweet2')(req, res);
});
