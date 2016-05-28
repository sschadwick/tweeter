'use strict';

var express = require('express');
var jsonParser = require('body-parser').json();
var uuid = require('node-uuid');

var responseHandler = require(__dirname + '/../lib/response_handler');
var queue = require(__dirname + '/../lib/schedule/queue');
var addCron = require(__dirname + '/../lib/schedule/addCron');
var stopCron = addCron.stopCron;
var deleteCron = addCron.deleteCron;

var scrape = require(__dirname + '/../lib/scrape');

var scheduleRoute = module.exports = exports = express.Router();

scheduleRoute.post('/addCron', jsonParser, function(req, res) {
  var task = addCron(req.body.cron, function() {
    scrape(req.body.scrape, function(urls, titles) {
      var choose = Math.floor(urls.length *  Math.random()) + 1;
      req.body.status = titles[choose] + ' ' + urls[choose];
      require(__dirname + '/../lib/twtr/tweetAuto')(req, res);
    });
  }).start();
  responseHandler.send200(res, 'Task now running: ' + task.id);
});

// Currently unused:
scheduleRoute.get('/stopCron/:id', function(req, res) {
  for (var i in queue) {
    if (req.params.id === queue[i].id) {
      var task = stopCron(queue[i]);
      responseHandler.send200(res, 'Task stopped: ' + task.id);
    }
  }
});

scheduleRoute.get('/deleteCron/:id', function(req, res) {
  for (var i in queue) {
    if (req.params.id === queue[i].id) {
      var task = deleteCron(queue[i]);
      responseHandler.send200(res, 'Task deleted: ' + task.id);
    }
  }
});

scheduleRoute.get('/queue', function(req, res) {
  var resQueue = [];
  for (var i in queue) {
    if (queue[i].id) {
      resQueue.push(queue[i].id);
    }
  }
  responseHandler.send200(res, resQueue);
});
