'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
process.env.MONGO_URL = 'mongodb://localhost/twetr_dev';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var User = require(__dirname + '/../models/user');
var eatauth = require(__dirname + '/../lib/eat_authentication');
var httpBasic = require(__dirname + '/../lib/http_basic');
var host = 'localhost:3000/api';

describe('http basic: header authorization', function() {
  it('should be able to handle http basic auth', function() {
    var req = { //simulate request
      headers: {
        authorization: 'Basic ' + (new Buffer('testuser1:foobar123')).toString('base64')
      }
    };

    httpBasic(req, {}, function() {
      expect(typeof req.auth).to.eql('object');
      expect(req.auth.username).to.eql('testuser1');
      expect(req.auth.password).to.eql('foobar123');
    });
  });
});

describe('auth', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to create a new user', function(done) {
    chai.request(host)
    .post('/signup')
    .send({username: 'testuser1', password: 'foobar123'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.token.length).to.be.above(0);
      done();
    });
  });

  describe('username must be unique', function() {
    it('should return an error', function(done) { //add new user to database before tests
      var user = new User();
      user.username = 'testuser1'; //this user should already exist according to signup route
      user.basic.username = 'testuser1';
      user.generateHash('foobar123', function(err, res) {
        if (err) throw err;
        user.save(function(err, data) {
          expect(err.code).to.eql(11000); //err code key already exists in db
          done();
        }.bind(this));
      }.bind(this));
    });
  });

  //PYRAMID OF DOOM
  describe('user info in database', function() {
    before(function(done) { //add new user to database before tests
      var user = new User();
      user.username = 'testuser2';
      user.basic.username = 'testuser2';

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

    it('should be able to sign in', function(done) {
      chai.request(host)
      .get('/signin')
      .auth('testuser2', 'foobar123')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.token.length).to.be.above(0);
        done();
      });
    });

    it('should be able to authenticate the eat token', function(done) {
      var token = this.token;
      var req = {
        headers: {
          token: token
        }
      };

      eatauth(req, {}, function() {
        expect(req.user.username).to.eql('testuser2');
        done();
      });
    });
  });
});
