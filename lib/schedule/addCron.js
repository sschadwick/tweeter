var cron = require('node-cron');
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

module.exports = exports = function(timer) {
  var task = cron.schedule(timer, function() {
    console.log('running task every 3 seconds');
  }, false);
  queue.add(task);
  return task;
};

exports.stopCron = function(task) {
  task.stop();
};

exports.deleteCron = function(task) {
  task.stop();
  queue.remove(task);
};
