'use strict';

var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/tweeter');
process.env.APP_SECRET = process.env.APP_SECRET || 'changemechangemechangeme';

var tweetRouter = require(__dirname + '/routes/tweet_routes');
var scheduleRouter = require(__dirname + '/routes/schedule_routes');
var userRouter = require(__dirname + '/routes/user_routes');

app.use(function(req, resp, next) {
  resp.header('Access-Control-Allow-Origin', '*');
  resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  resp.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  next();
});

app.use('/api', tweetRouter);
app.use('/api', scheduleRouter);
app.use('/api', userRouter);
app.use(express.static(__dirname + '/app'));

app.use(function(req, res) {
  res.status(404).send('Page not found');
});

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('server is running on ' + port);
});
