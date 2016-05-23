'use strict';

module.exports = exports = function(err, res) {
  res.status(err.statusCode).json(err);
};
