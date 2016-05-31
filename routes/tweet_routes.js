'use strict';

var express = require('express');
var jsonParser = require('body-parser').json();

var eatAuth = require(__dirname + '/../lib/eat_authentication');

var tweetRoute = module.exports = exports = express.Router();

// SEARCHING: (returns 10 most recent tweets matching str)

// does not support non-alphanumeric characters (eg #myfirsttweet)
tweetRoute.post('/search', jsonParser, eatAuth, function(req, res) {
  require(__dirname + '/../lib/twtr/search')(req, res);
});

// FOLLOWING:

// Add Follow
tweetRoute.post('/follow/:id', jsonParser, eatAuth, function(req, res) {
  require(__dirname + '/../lib/twtr/addFollow')(req, res);
});

// Un-Follow
tweetRoute.post('/unfollow/:id', jsonParser, eatAuth, function(req, res) {
  require(__dirname + '/../lib/twtr/unFollow')(req, res);
});

// TWEETING:

// New tweet
tweetRoute.post('/tweet', jsonParser, eatAuth, function(req, res) {
  require(__dirname + '/../lib/twtr/tweet')(req, res);
});

// Un-tweet
tweetRoute.post('/untweet/:tweetId', jsonParser, eatAuth, function(req, res) {
  require(__dirname + '/../lib/twtr/untweet')(req, res);
});

// Re-tweet
tweetRoute.post('/retweet/:tweetId', jsonParser, eatAuth, function(req, res) {
  require(__dirname + '/../lib/twtr/retweet')(req, res);
});

// Unre-tweet
tweetRoute.post('/unretweet/:tweetId', jsonParser, eatAuth, function(req, res) {
  require(__dirname + '/../lib/twtr/unretweet')(req, res);
});

// Convert Username to ID
tweetRoute.post('/usernameToId/:username', jsonParser, eatAuth, function(req, res) {
  require(__dirname + '/../lib/twtr/usernameToId')(req, res);
});
