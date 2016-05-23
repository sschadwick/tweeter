'use strict';

var express = require('express');
var jsonParser = require('body-parser').json();

var tweetRoute = module.exports = exports = express.Router();

// SEARCHING: (returns 10 most recent tweets matching str)

tweetRoute.get('/search/:str', function(req, res) {
  require(__dirname + '/../lib/search')(req, res);
});

// FOLLOWING:

// Add Follow
tweetRoute.post('/follow/:id', jsonParser, function(req, res) {
  require(__dirname + '/../lib/addFollow2')(req, res);
});

// Un-Follow
tweetRoute.post('/unfollow/:id', jsonParser, function(req, res) {
  require(__dirname + '/../lib/unFollow2')(req, res);
});

// TWEETING:

// New tweet
tweetRoute.post('/tweet', jsonParser, function(req, res) {
  require(__dirname + '/../lib/tweet2')(req, res);
});

// Un-tweet
tweetRoute.post('/untweet/:tweetId', jsonParser, function(req, res) {
  require(__dirname + '/../lib/untweet2')(req, res);
});

// Re-tweet
tweetRoute.post('/retweet/:tweetId', jsonParser, function(req, res) {
  require(__dirname + '/../lib/retweet2')(req, res);
});

// Unre-tweet
tweetRoute.post('/unretweet/:tweetId', jsonParser, function(req, res) {
  require(__dirname + '/../lib/unretweet2')(req, res);
});
