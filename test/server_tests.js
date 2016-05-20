'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;

require(__dirname + '/../server');
var host = 'http://127.0.0.1:3000/api';

var randomUser = '';
var tempTweet = '';
var tempRetweet = '';

describe('Following Tests', function() {

  // Searching

  it('should be able to search using a GET route', function(done) {
    chai.request(host)
      .get('/search/MyFirstTweet')
      .end(function(err, res) {
        randomUser = res.body.msg.statuses[0].user.id_str;
        tempRetweet = res.body.msg.statuses[0].id_str;
        expect(err).to.eql(null);
        expect(typeof res.body.msg.statuses).to.eql('object');
        expect(res.body.msg.statuses[0].text.indexOf('#myfirstTweet')).to.be.greaterThan(0);
        done();
      });
  });

  // Following

  it('should be able to follow a new person using a POST ROUTE', function(done) {
    chai.request(host)
      .post('/follow/' + randomUser)
      .send({})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg.id_str).to.eql(randomUser);
        done();
      });
  });

  it('should be able to unfollow a person using a POST route', function(done) {
    chai.request(host)
      .post('/unfollow/' + randomUser)
      .send({})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg.id_str).to.eql(randomUser);
        done();
      });
  });

  // Tweeting

  it('should be able to create a new tweet using a POST route', function(done) {
    chai.request(host)
      .post('/tweet')
      .send({status: 'Hello World!'})
      .end(function(err, res) {
        tempTweet = res.body.msg.id_str;
        expect(err).to.eql(null);
        done();
      });
  });

  it('should be able to untweet using a POST route', function(done) {
    chai.request(host)
      .post('/untweet/' + tempTweet)
      .send({})
      .end(function(err, res) {
        expect(err).to.eql(null);
        done();
      });
  });

  it('should be able to retweet using a POST route', function(done) {
    chai.request(host)
      .post('/retweet/' + tempRetweet)
      .send({})
      .end(function(err, res) {
        expect(err).to.eql(null);
        done();
      });
  });

  it('should be able to unretweet using a POST route', function(done) {
    chai.request(host)
      .post('/unretweet/' + tempRetweet)
      .send({})
      .end(function(err, res) {
        expect(err).to.eql(null);
        done();
      });
  });

});
