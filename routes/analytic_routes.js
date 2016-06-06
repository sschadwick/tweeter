'use strict';

var express = require('express');
var jsonParser = require('body-parser').json();
var fs = require('fs');

var logger = require(__dirname + '/../lib/logger');
var eatAuth = require(__dirname + '/../lib/eat_authentication');
var responseHandler = require(__dirname + '/../lib/response_handler');

var analyticRouter = module.exports = exports = express.Router();

analyticRouter.get('/analytics/:username', function(req, res) {
  fs.readFile(__dirname + '/../data/' + req.params.username + '.xls', function(err, data) {
    if (err) {res.json('File not found');} else {
      res.json(data.toString());
    }
  });
});
