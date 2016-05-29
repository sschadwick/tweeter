var cron = require('node-cron');
var uuid = require('node-uuid');
var queue = require(__dirname + '/queue');

/* ┌────────────── second (optional)
   │ ┌──────────── minute
   │ │ ┌────────── hour
   │ │ │ ┌──────── day of month
   │ │ │ │ ┌────── month
   │ │ │ │ │ ┌──── day of week
   │ │ │ │ │ │
   │ │ │ │ │ │
   * * * * * *
*/

module.exports = exports = function(timer, func, username, title, frequency) {
  var task = cron.schedule(timer, function() {
    func();
  }, false);
  task.id = uuid.v1().slice(0, 8); // PRNG - based on time
  task.username = username;
  task.title = title;
  task.frequency = frequency;
  queue.add(task);
  return task;
};

exports.stopCron = function(task) {
  task.stop();
  return task;
};

exports.deleteCron = function(task) {
  task.stop();
  queue.remove(task);
  return task;
};
