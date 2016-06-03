'use strict';

var express = require('express');
var jsonParser = require('body-parser').json();

var eatAuth = require(__dirname + '/../lib/eat_authentication');
var responseHandler = require(__dirname + '/../lib/response_handler');

var analyticRouter = module.exports = exports = express.Router();

var logger = require(__dirname + '/../lib/logger');

analyticRouter.get('/analytics', function(req, res) {
  logger(req, res);
});
