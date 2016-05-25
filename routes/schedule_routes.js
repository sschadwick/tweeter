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
  var task = addCron('*/3 * * * * *').start();
  // Add an id tag to track tasks
  responseHandler.send200(res, 'task started');
});

scheduleRoute.get('/stopCron', function(req, res) {

  // remove based on req.body.task
  stopCron(queue[0]);
  responseHandler.send200(res, 'task stopped');
});

scheduleRoute.get('/deleteCron', function(req, res) {
  deleteCron(queue[0]);
  responseHandler.send200(res, 'task deleted');
});
