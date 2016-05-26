module.exports = exports = [];

exports.add = function(task) {
  this.push(task);
};

exports.remove = function(task) {
  this.splice(this.indexOf(task), 1);
};
