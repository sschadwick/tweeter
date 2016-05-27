'use strict';

module.exports = exports = function(err, res) {
  console.log(err);
  res.status(err.statusCode).json(err);
};
