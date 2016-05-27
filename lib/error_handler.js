'use strict';

module.exports = exports = function(err, res) {
  res.status(500).json({msg: 'Error encountered: ' + err});
};
