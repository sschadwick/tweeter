'use strict';

var express = require('express');
var app = express();

var tweetRouter = require(__dirname + '/routes/tweet_routes');

app.use(express.static('public'));
app.use('/fl/', tweetRouter);

app.use(function(req, res) {
  res.status(404).send('Page not found');
});

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('server is running on ' + port);
});
