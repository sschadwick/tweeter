var cheerio = require('cheerio');
var request = require('request');

var urls = [];
var titles = [];

module.exports = exports = function(subreddit, config, callback) {
  // config: {imageTweet: true || articleTweet: true || organicTweet: true}

  request('http://www.reddit.com/r/' + subreddit, function(err, res) {
    if (!err && res.statusCode === 200) {
      var $ = cheerio.load(res.body);
      $('a.title', '#siteTable').each(function() {
        if (urls.length < 20) { // amount of scraped posts
          var url = this.attribs.href;

          // Scrape for an Image post
          if (config.imageTweet) {
            if (url.indexOf('imgur.com') !== -1) {
              urls.push(url);
              var title = this.children[0].data;
              titles.push(title);
            }
          }

          // Scrape for an Article post
          if (config.articleTweet) {
          }

          // Scrape for a pseudo-organic post
          if (config.organicTweet) {
          }

        }
      });
    }
    callback(urls, titles);
  });
};
