module.exports = function(app) {
  require('./controllers/tweets_controller')(app);
  require('./controllers/keys_controller')(app);
};
