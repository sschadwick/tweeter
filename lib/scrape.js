var cheerio = require('cheerio');
var request = require('request');

var urls = [];
var titles = [];

module.exports = exports = function(subreddit, callback) {
  // options: {image-tweet || article-tweet || organic tweet}
  request('http://www.reddit.com/r/' + subreddit, function(err, res) {
    if (!err && res.statusCode === 200) {
      var $ = cheerio.load(res.body);
      $('a.title', '#siteTable').each(function() {
        if (urls.length < 20) { // amount of scraped posts
          var url = this.attribs.href;
          if (url.indexOf('imgur.com') === -1) {
            urls.push(url);
          }
          var title = this.children[0].data;
          titles.push(title);
        }
      });
    }
    callback(urls, titles);
  });
};
