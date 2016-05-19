var Twit = require('twit');
var T = new Twit(require('./config.js'));

var addFollow = require('./lib/addFollow');
var unFollow = require('./lib/unFollow');

  function retweetLatest() {
    var mediaArtsSearch = {q: "#MyFirstTweet", count: 10, result_type: "recent"}; 
    T.get('search/tweets', mediaArtsSearch, function (error, data) {
      // log out any errors and responses
      if (error) console.log(error);

      // If our search request to the server had no errors...
      if (!error) {
        // ...then we grab the ID of the tweet we want to retweet...
      var retweetId = data.statuses[0].id_str;

      // for (var i in data.statuses) {
      //  if (data.statuses[i].text.indexOf('#myfirsttweet')) {
      //    console.log(data.statuses[i]);
      //  }
      // }


      // ...and then we tell Twitter we want to retweet it!
      // T.post('statuses/retweet/' + retweetId, { }, function (error, response) {
      //  if (response) {
      //    console.log('Success! Check your bot, it should have retweeted something.')
      //  }
      //  // If there was an error with our Twitter call, we print it out here.
      //  if (error) {
      //    console.log('There was an error with Twitter:', error);
      //  }
      // })
      }
      // However, if our original search request had an error, we want to print it out here.
      else {
        console.log('There was an error with your hashtag search:', error);
      }
    });
  }



  // ...and then every hour after that. Time here is in milliseconds, so
  // 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
  setInterval(retweetLatest, 1000 * 60 * 60);


