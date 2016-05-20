var chai = require('chai');
var expect = chai.expect;

var search = require(__dirname + '/../lib/search');
var tweet = require(__dirname + '/../lib/tweet');
var untweet = require(__dirname + '/../lib/untweet');
var addFollow = require(__dirname + '/../lib/addFollow');
var unFollow = require(__dirname + '/../lib/unFollow');
var retweet = require(__dirname + '/../lib/retweet');
var unretweet = require(__dirname + '/../lib/unretweet');
var followTheLeader = require(__dirname + '/../lib/followTheLeader');

var randomId = '730617219730669569';
var testUserId = '';
var randomTweet = 'Hello world!';
var tempTweetId = '';
var tempArr = [];

describe('Twitter API Unit Tests', function() {

  it('should be able to search recent tweets', function(done) {
    search('#myFirstTweet', function(err, res) {
      testUserId = res.statuses[0].user.id_str;
      expect(err).to.eql(null);
      expect(typeof res.statuses).to.eql('object');
      done();
    });
  });

  it('should add all the followers of the specific user', function(done) {
    followTheLeader(testUserId, function(err, res) {
      expect(err).to.eql(null);
      expect(typeof res).to.eql('object');
      for (var i in res) {
        unFollow(res[i], function(err, data) {});
      }
      done();
    });
  });

  it('should be able to make a new tweet', function(done) {
    tweet(randomTweet, function(err, res) {
      tempTweetId = res.id_str;
      expect(err).to.eql(null);
      expect(res.text).to.eql('Hello world!');
      done();
    });
  });

  it('should be able to delete that recent tweet', function(done) {
    untweet(tempTweetId, function(err, res) {
      expect(err).to.eql(null);
      done();
    });
  });

  it('should be able to follow a user', function(done) {
    addFollow(testUserId, function(err, res) {
      expect(err).to.eql(null);
      done();
    });
  });

  it('should be able to unfollow a user', function(done) {
    unFollow(testUserId, function(err, res) {
      expect(err).to.eql(null);
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
