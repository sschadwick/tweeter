'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;

process.env.MONGO_URL = 'mongodb://localhost/review_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var host = 'localhost:3000/api';
var User = require(__dirname + '/../models/user');

// Tests will only be auth'ed locally
var authObj = require(__dirname + '/../config');

var randomUser;
var tempRetweet;
var tempTweet;

describe('The Twetr Server', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function(err) {
      if (err) throw err;
      done();
    });
  });

  before(function(done) {
    var user = new User();
    user.username = 'testUser';
    user.basic.username = 'testUser';
    user.generateHash('foobar123', function(err, res) {
      if (err) throw err;
      user.save(function(err, data) {
        if (err) throw err;
        user.generateToken(function(err, token) {
          if (err) throw err;
          this.token = token;
          done();
        }.bind(this));
      }.bind(this));
    }.bind(this));
  });

  it('should be able to search using a GET request', function(done) {
    chai.request(host)
      .get('/search/myfirstTweet')
      .set(authObj)
      .end(function(err, res) {
        randomUser = res.body.msg.statuses[0].user.id_str;
        tempRetweet = res.body.msg.statuses[0].id_str;
        expect(err).to.eql(null);
        expect(typeof res.body.msg.statuses).to.eql('object');
        expect(typeof res.body.msg.statuses[0].text).to.eql('string');
        done();
      });
  });

  it('should be able to follow a user using a POST request', function(done) {
    chai.request(host)
      .post('/follow/' + randomUser)
      .set(authObj)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg.id_str).to.eql(randomUser);
        done();
      });
  });

  it('should be able to unfollow a user using a POST request', function(done) {
    chai.request(host)
      .post('/unfollow/' + randomUser)
      .set(authObj)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg.id_str).to.eql(randomUser);
        done();
      });
  });

  it('should be able to tweet using a POST request', function(done) {
    chai.request(host)
      .post('/tweet')
      .send({status: 'Hello World!'})
      .set(authObj)
      .end(function(err, res) {
        tempTweet = res.body.msg.id_str;
        expect(err).to.eql(null);
        expect(res.body.msg.text).to.eql('Hello World!');
        done();
      });
  });

  it('should be able to untweet using a POST route', function(done) {
    chai.request(host)
      .post('/untweet/' + tempTweet)
      .set(authObj)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg.id_str).to.eql(tempTweet);
        done();
      });
  });

  it('should be able to retweet using a POST route', function(done) {
    chai.request(host)
      .post('/retweet/' + tempRetweet)
      .set(authObj)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg.retweeted_status.id_str).to.eql(tempRetweet);
        done();
      });
  });

  it('should be able to unretweet using a POST route', function(done) {
    chai.request(host)
      .post('/unretweet/' + tempRetweet)
      .set(authObj)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg.id_str).to.eql(tempRetweet);
        done();
      });
  });

});
