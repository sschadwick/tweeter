$(function() {
  var server = 'http://localhost:3000';
  // Function definitions
  function sendData(data, url, callback) {
    $.ajax({
      url: url,
      type: 'POST',
      contentType: 'application/json',
      data: data,
      dataType: 'json'
    }).done(function(res) {
      if (callback) {
        callback(res);
      }
    });
  }

  function loadCookies() {
    if (Cookies.get('twetr')) {
      var keys = JSON.parse(Cookies.get('twetr'));
      $('#consumer_key').val(keys.consumer_key);
      $('#consumer_secret').val(keys.consumer_secret);
      $('#access_token').val(keys.access_token);
      $('#access_token_secret').val(keys.access_token_secret);
    }
  }

  function loadAuth() {
    var formData = $('#authForm').serializeArray();
    var authObj = {};
    for (var i in formData) {
      if (formData[i].name) {
        authObj[formData[i].name] = formData[i].value;
      }
    }
    return authObj;
  }

  // Load cookies on page load (TODO: Put in jquery onload)
  loadCookies();

  // Button event listeners

  // New Tweet
  $('#submitTweet').on('click', function(e) {
    e.preventDefault();
    var authObj = loadAuth();
    authObj.status = $('#status').val();
    sendData(JSON.stringify(authObj), server + '/api/tweet', function(res) {
      $('#submitSuccess').html('Tweet sent successfully! Tweet ID is : ' + res.msg.id_str);
    });
  });

  // Untweet
  $('#submitUntweet').on('click', function(e) {
    e.preventDefault();
    var authObj = loadAuth();
    var tweetId = $('#untweet').val();
    sendData(JSON.stringify(authObj), server + '/api/untweet/' + tweetId, function(res) {
      $('#submitSuccess').html('Un-tweet sent successfully!');
    });
  });

  // Retweet
  $('#submitRetweet').on('click', function(e) {
    e.preventDefault();
    var authObj = loadAuth();
    var tweetId = $('#retweet').val();
    sendData(JSON.stringify(authObj), server + '/api/retweet/' + tweetId, function(res) {
      $('#submitSuccess').html('Retweet sent successfully');
    });
  });

  // Unretweet
  $('#submitUnretweet').on('click', function(e) {
    e.preventDefault();
    var authObj = loadAuth();
    var tweetId = $('#unretweet').val();
    sendData(JSON.stringify(authObj), server + '/api/unretweet/' + tweetId, function(res) {
      $('#submitSuccess').html('Un-Retweet sent successfully!');
    });
  });

  // Follow
  $('#submitFollow').on('click', function(e) {
    e.preventDefault();
    var authObj = loadAuth();
    var userId = $('#follow').val();
    sendData(JSON.stringify(authObj), server + '/api/follow/' + userId, function(res) {
      $('#submitSuccess').html('Now following: ' + res.msg.screen_name + ', User ID: ' + res.msg.id_str);
    });
  });

  // Unfollow
  $('#submitUnfollow').on('click', function(e) {
    e.preventDefault();
    var authObj = loadAuth();
    var userId = $('#unfollow').val();
    sendData(JSON.stringify(authObj), server + '/api/unfollow/' + userId, function(res) {
      $('#submitSuccess').html('No longer following: ' + res.msg.screen_name + ', User ID: ' + res.msg.id_str);
    });
  });

  // Convert Username to ID
  $('#submitConvert').on('click', function(e) {
    e.preventDefault();
    var authObj = loadAuth();
    var username = $('#converter').val();
    sendData(JSON.stringify(authObj), server + '/api/username/' + username, function(res) {
      $('#submitSuccess').html('That user\'s id is: ' + res.msg.id_str);
    });
  });

  // AutoTweet from Subreddit
  $('#submitAutotweet').on('click', function(e) {
    e.preventDefault();
    var authObj = loadAuth();
    authObj.scrape = $('#subreddit').val();
    authObj.cron = '1,2,3,4,5 * * * *';
    sendData(JSON.stringify(authObj), server + '/api/addCron', function(res) {
      $('#submitSuccess').html('Now AutoTweeting!');
    });
  });

  // Save Auth Keys
  $('#saveKeys').on('click', function(e) {
    e.preventDefault();
    Cookies.set('twetr', {
      consumer_key: $('#consumer_key').val(),
      consumer_secret: $('#consumer_secret').val(),
      access_token: $('#access_token').val(),
      access_token_secret: $('#access_token_secret').val()
    }, { expires: 365 });
    $('#saveSuccess').html('Keys saved!');
  });

});
