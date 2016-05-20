'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;

require(__dirname + '/../server');
var host = 'http://127.0.0.1:3000/api';

describe('Server Tests', function() {

  it('should be able to search GET route', function(done) {
    chai.request(host)
      .get('/search/MyFirstTweet')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(typeof res.body.msg.statuses).to.eql('object');
        expect(res.body.msg.statuses[0].text.indexOf('#myfirstTweet')).to.be.greaterThan(0);
        done();
      });
  });

});
