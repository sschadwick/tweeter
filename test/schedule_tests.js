'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;

require(__dirname + '/../server');
var mongoose = require('mongoose');
var User = require(__dirname + '/../models/user');
var host = 'localhost:3000/api';

// Tests will only be auth'ed locally
var authObj = require(__dirname + '/../config');

var taskId;

describe('The Scheduler API', function() {

  before(function(done) {
    var user = new User();
    user.username = 'test';
    user.basic.username = 'test';
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

  after(function(done) {
    mongoose.connection.db.dropDatabase(function(err) {
      if (err) throw err;
      done();
    });
  });

  it('should be able to add a new cron', function(done) {
    authObj.token = this.token;
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
    authObj.token = this.token;
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
    authObj.token = this.token;
    chai.request(host)
      .get('/deleteCron/' + taskId.id)
      .set(authObj)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg.split(': ')[0]).to.eql('Task deleted');
        done();
      });
  });

});
