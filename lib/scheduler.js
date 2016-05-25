var cron = require('node-cron');

module.exports = {

}

exports.newCron = function(req, res, callback) {
  var task = cron.schedule('* * * * *', function(){
    console.log('running a task every minute');
  });

};


exports.stopCron = function(req, res, callback) {

}

exports.newCron();
