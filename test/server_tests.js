'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;

require(__dirname + '/../server');
var host = 'http://127.0.0.1:3000/api';

var randomUser = '';

describe('Following Tests', function() {

  it('should be able to search using a GET route', function(done) {
    chai.request(host)
      .get('/search/MyFirstTweet')
      .end(function(err, res) {
        randomUser = res.body.msg.statuses[0].user.id_str;
        expect(err).to.eql(null);
        expect(typeof res.body.msg.statuses).to.eql('object');
        expect(res.body.msg.statuses[0].text.indexOf('#myfirstTweet')).to.be.greaterThan(0);
        done();
      });
  });

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

  it('should be able to retweet using a POST route');

  it('should be able to unretweet using a POST route');

  it('should be able to follow a new person using a POST route');

  it('should be able to create a new tweet using a POST route');

  it('should be able to untweet using a POST route');
});
