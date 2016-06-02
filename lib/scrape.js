var cheerio = require('cheerio');
var request = require('request');

var urls = [];
var titles = [];

module.exports = exports = function(subreddit, callback) {

  request('http://www.reddit.com/r/' + subreddit, function(err, res) {
    if (!err && res.statusCode === 200) {
      var $ = cheerio.load(res.body);
      $('a.title', '#siteTable').each(function() {
        if (urls.length < 20) { // amount of scraped posts
          var url = this.attribs.href;

          // Scrape for an Image post
          if (url.indexOf('imgur.com') !== -1) {
            urls.push(url);
            titles.push(this.children[0].data);
          }

          // Scrape for an self.reddit post
          else if (url.indexOf('http') === -1) {
            url = 'http://www.reddit.com' + url;
            urls.push(url);
            titles.push(this.children[0].data);
          }

          // Scrape for a pseudo-organic post
          else {urls.push(url);
            titles.push(this.children[0].data);
          }
        }
      });
    }
    callback(urls, titles);
  });
};
