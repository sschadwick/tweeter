'use strict';

exports.err = function(res, status, msg) {
  res.status(status).json({msg: msg});
};

exports.err500 = function(err, res) {
  exports.err(res, 500, 'Internal Server Error');
};

exports.err401 = function(err, res) {
  exports.err(res, 401, 'Forbidden');
};

exports.err404 = function(err, res) {
  exports.err(res, 404, 'File Not Found');
};
