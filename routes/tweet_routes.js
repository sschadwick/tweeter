'use strict';

var express = require('express');
var jsonParser = require('body-parser').json();

var tweetRoute = module.exports = exports = express.Router();

// SEARCHING: (returns 10 most recent tweets matching str)

tweetRoute.get('/search/:str', function(req, res) {
  require(__dirname + '/../lib/twitter/search')(req, res);
});

// FOLLOWING:

// Add Follow
tweetRoute.post('/follow/:id', jsonParser, function(req, res) {
  require(__dirname + '/../lib/twitter/addFollow')(req, res);
});

// Un-Follow
tweetRoute.post('/unfollow/:id', jsonParser, function(req, res) {
  require(__dirname + '/../lib/twitter/unFollow')(req, res);
});

// TWEETING:

// New tweet
tweetRoute.post('/tweet', jsonParser, function(req, res) {
  require(__dirname + '/../lib/twitter/tweet')(req, res);
});

// Un-tweet
tweetRoute.post('/untweet/:tweetId', jsonParser, function(req, res) {
  require(__dirname + '/../lib/twitter/untweet')(req, res);
});

// Re-tweet
tweetRoute.post('/retweet/:tweetId', jsonParser, function(req, res) {
  require(__dirname + '/../lib/twitter/retweet')(req, res);
});

// Unre-tweet
tweetRoute.post('/unretweet/:tweetId', jsonParser, function(req, res) {
  require(__dirname + '/../lib/twitter/unretweet')(req, res);
});

// Convert Username to ID
tweetRoute.post('/username/:username', jsonParser, function(req, res) {
  require(__dirname + '/../lib/twitter/usernameToId')(req, res);
});
