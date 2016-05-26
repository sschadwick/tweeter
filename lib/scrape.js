var cheerio = require('cheerio');
var request = require('request');

var urls = [];
var titles = [];

module.exports = exports = function(subreddit, callback) {
  request('http://www.reddit.com/r/' + subreddit, function(err, res) {
    if (!err && res.statusCode === 200) {
      var $ = cheerio.load(res.body);
      $('a.title', '#siteTable').each(function() {
        if (urls.length < 10) {
          var url = this.attribs.href;
          if (url.indexOf('http') === -1) {
            url = 'http://www.reddit.com' + url;
          }
          var title = this.children[0].data;
          urls.push(url);
          titles.push(title);
        }
      });
    }
    callback(urls, titles);
  });
};
