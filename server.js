'use strict';

var express = require('express');
var app = express();

var tweetRouter = require(__dirname + '/routes/tweet_routes');

app.use(function(req, resp, next) {
  resp.header('Access-Control-Allow-Origin', '*');
  resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  resp.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  next();
});

app.use('/api', tweetRouter);
app.use(express.static('public'));

app.use(function(req, res) {
  res.status(404).send('Page not found');
});

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('server is running on ' + port);
});
