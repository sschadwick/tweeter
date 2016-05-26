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
      var choose = Math.floor(9 *  Math.random()) + 1;

      req.body.status = titles[choose] + ' ' + urls[choose];
      require(__dirname + '/../lib/twitter/tweet2')(req, res);
    });
  }).start();
  responseHandler.send200(res, 'task now running: ' + task.id);
});

scheduleRoute.get('/stopCron/:id', function(req, res) {
  for (var i in queue) {
    if (req.params.id === queue[i].id) {
      var task = stopCron(queue[i]);
      responseHandler.send200(res, 'task stopped: ' + task.id);
    }
  }
});

scheduleRoute.get('/deleteCron/:id', function(req, res) {
  for (var i in queue) {
    if (req.params.id === queue[i].id) {
      var task = deleteCron(queue[i]);
      responseHandler.send200(res, 'task deleted: ' + task.id);
    }
  }
});

scheduleRoute.get('/queue', function(req, res) {
  var resQueue = [];
  for (var i in queue) {
    resQueue.push(queue[i].id);
  }
  responseHandler.send200(res, resQueue);
});
