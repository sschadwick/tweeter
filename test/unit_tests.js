var chai = require('chai');
var expect = chai.expect;

var search = require(__dirname + '/../lib/search');
var addFollow = require(__dirname + '/../lib/addFollow');
var unFollow = require(__dirname + '/../lib/unFollow');
var retweet = require(__dirname + '/../lib/retweet');
var unretweet = require(__dirname + '/../lib/unretweet');

var randomName = 'mattblaze';
var randomId = '730617219730669569';

describe('Twitter API', function() {

  it('should be able to search recent tweets', function(done) {
    search('#myFirstTweet', function(err, res) {
      expect(err).to.eql(null);
      expect(typeof res.statuses).to.eql('object');
      done(0);
    });
  });

  it('should be able to follow a user', function(done) {
    addFollow(randomName, function(err, res) {
      expect(err).to.eql(null);
      expect(res.screen_name).to.eql('mattblaze');
      expect(res.following).to.eql(true);
      done();
    });
  });

  it('should be able to unfollow a user', function(done) {
    unFollow(randomName, function(err, res) {
      expect(err).to.eql(null);
      expect(res.screen_name).to.eql('mattblaze');
      done();
    });
  });

  it('should be able to retweet', function(done) {
    retweet(randomId, function(err, res) {
      expect(err).to.eql(null);
      expect(res.retweeted).to.eql(true);
      expect(typeof res.retweeted_status).to.eql('object');
      done();
    });
  });

  it('should be able to unretweet', function(done) {
    unretweet(randomId, function(err, res) {
      expect(err).to.eql(null);
      expect(res.id_str).to.eql(randomId);
      done();
    });
  });


});
