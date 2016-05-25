'use strict';

var express = require('express');
var jsonParser = require('body-parser').json();

var responseHandler = require(__dirname + '/../lib/response_handler');
var queue = require(__dirname + '/../lib/schedule/queue');
var addCron = require(__dirname + '/../lib/schedule/addCron');
var stopCron = addCron.stopCron;
var deleteCron = addCron.deleteCron;

var scheduleRoute = module.exports = exports = express.Router();

scheduleRoute.get('/schedule', function(req, res) {
  var task = addCron('*/3 * * * * *', function() {
    console.log('log it every so often');
  }).start();
  responseHandler.send200(res, 'task started: ' + task.id);
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
