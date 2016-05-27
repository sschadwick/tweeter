var express = require('express');
var jsonParser = require('body-parser').json();
var errorHandler = require(__dirname + '/../lib/error_handler');
var User = require(__dirname + '/../models/user');
var eatAuth = require(__dirname + '/../lib/eat_authentication');
var httpBasic = require(__dirname + '/../lib/http_basic');
var mongoose = require('mongoose');

var userRouter = module.exports = exports = express.Router();

// Hardcoded dummy-user. TODO: Delete eventually
var devUser = new User();
devUser.basic.username = 'admin';
devUser.username = 'admin';
devUser.generateHash('admin', function(err, hash) {
  devUser.save(function(err, data) {
  });
});

userRouter.post('/signup', jsonParser, function(req, res) {
  var newUser = new User();
  newUser.basic.username = req.body.username;
  newUser.username = req.body.username;
  newUser.generateHash(req.body.password, function(err, hash) {
    // newUser is overwriting existing user
    if (err) {return errorHandler(err, res);}
    newUser.save(function(err, data) {
      if (err) {return errorHandler(err, res);}
      newUser.generateToken(function(err, token) {
        res.json({token: token});
      });
    });
  });
});

userRouter.get('/signin', httpBasic, function(req, res) {
  User.findOne({'basic.username': req.auth.username}, function(err, user) {
    if (err) {return errorHandler(err, res);}
    user.compareHash(req.auth.password, function(err, hashRes) {
      if (err) {return errorHandler(err, res);}
      if (!hashRes) {
        return errorHandler(err, res);
      }
      user.generateToken(function(err, token) {
        if (err) {return errorHandler(err, res);}
        res.json({token: token});
      });
    });
  });
});

userRouter.get('/signout', function(req, res) {
  if (!req.user) {
    return res.json({ msg: 'sign out failed' });
  }
  req.user.token = '';
  req.user.save(function(err, data) {
    if (err) {
      return errorHandler(err, res);
    }
    return res.json({ msg: 'sign out successful' });
  });
});

userRouter.get('/username', jsonParser, eatAuth, function(req, res) {
  res.json({username: req.user.username});
});
