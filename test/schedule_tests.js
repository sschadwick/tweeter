'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;

require(__dirname + '/../server');
var mongoose = require('mongoose');
var host = 'localhost:3000/api';

// Tests will only be auth'ed locally
var authObj = require(__dirname + '/../config');

var taskId;

// Need to add a before() login script, eatAuth is active on these routes

describe('The Scheduler API', function() {
  it('should be able to add a new cron', function(done) {
    chai.request(host)
      .post('/addCron')
      .set(authObj)
      .send({scrape: 'test', cron: '* * * * *'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg.split(': ')[0]).to.eql('Task now running');
        done();
      });
  });

  it('should return the queue', function(done) {
    chai.request(host)
      .get('/queue')
      .set(authObj)
      .end(function(err, res) {
        taskId = res.body.msg[0];
        expect(err).to.eql(null);
        expect(typeof res.body.msg).to.eql('object');
        done();
      });
  });

  it('should be able to delete a cron', function(done) {
    chai.request(host)
      .get('/deleteCron/' + taskId)
      .set(authObj)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg.split(': ')[0]).to.eql('Task deleted');
        done();
      });
  });

});
