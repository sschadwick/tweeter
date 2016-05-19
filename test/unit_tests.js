var chai = require('chai');
var expect = chai.expect;

var addFollow = require(__dirname + '/../lib/addFollow');
var unFollow = require(__dirname + '/../lib/unFollow');

describe('Twitter API', function() {

  it('should be able to follow a user', function(done) {
    addFollow('mattblaze', function(err, res) {
      expect(err).to.eql(null);
      expect(res.screen_name).to.eql('mattblaze');
      expect(res.following).to.eql(true);
      done();
    });
  });

  it('should be able to unfollow a user', function(done) {
    unFollow('mattblaze', function(err, res) {
      expect(err).to.eql(null);
      expect(res.screen_name).to.eql('mattblaze');
      done();
    });
  });
});
