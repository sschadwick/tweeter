'use strict';

var express = require('express');
var jsonParser = require('body-parser').json();
var fs = require('fs');

var eatAuth = require(__dirname + '/../lib/eat_authentication');
var responseHandler = require(__dirname + '/../lib/response_handler');

var analyticRouter = module.exports = exports = express.Router();

var logger = require(__dirname + '/../lib/logger');

// TODO: change this to return the spreadsheet info
analyticRouter.get('/analytics', function(req, res) {
  fs.readFile(__dirname + '/../file.xls', function(err, data) {
    if (err) {res.write('File not found');} else {
      res.json(data.toString());
    }
  });
});
