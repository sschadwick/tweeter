'use strict';

var logger = require(__dirname + '/logger');

function send (res, status, msg) {
  res.status(status).json({msg: msg});
}

exports.send200 = function (res, msg) {
  send(res, 200, msg);
};

exports.send201 = function (res, msg) {
  send(res, 201, msg);
};

exports.send202 = function (res, msg) {
  send(res, 202, msg);
};
