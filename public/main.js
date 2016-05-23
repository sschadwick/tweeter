$(function() {
  var server = 'http://localhost:3000';
  // Function definitions
  function sendData(data, url) {
    $.ajax({
      url: url,
      type: 'POST',
      contentType: 'application/json',
      data: data,
      dataType: 'json'
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
    sendData(JSON.stringify(authObj), server + '/api/tweet');

    // TODO: only update on success response
    $('#submitSuccess').html('Tweet sent successfully!');
  });

  // Untweet
  $('#submitUntweet').on('click', function(e) {
    e.preventDefault();
    var authObj = loadAuth();
    var tweetId = $('#untweet').val();
    sendData(JSON.stringify(authObj), server + '/api/untweet/' + tweetId);

    // TODO: only update on success response
    $('#submitSuccess').html('Un-tweet sent successfully!');
  });

  // Retweet
  $('#submitRetweet').on('click', function(e) {
    e.preventDefault();
    var authObj = loadAuth();
    var tweetId = $('#retweet').val();
    sendData(JSON.stringify(authObj), server + '/api/retweet/' + tweetId);

    // TODO: only update on success response
    $('#submitSuccess').html('Retweet sent successfully!');
  });

  // Unretweet
  $('#submitUnretweet').on('click', function(e) {
    e.preventDefault();
    var authObj = loadAuth();
    var tweetId = $('#unretweet').val();
    sendData(JSON.stringify(authObj), server + '/api/unretweet/' + tweetId);

    // TODO: only update on success response
    $('#submitSuccess').html('Un-Retweet sent successfully!');
  });

  // Follow
  $('#submitFollow').on('click', function(e) {
    e.preventDefault();
    var authObj = loadAuth();
    var userId = $('#follow').val();
    sendData(JSON.stringify(authObj), server + '/api/follow/' + userId);

    // TODO: only update on success response
    $('#submitSuccess').html('Now following: ' + userId);
  });

  // Unfollow
  $('#submitUnfollow').on('click', function(e) {
    e.preventDefault();
    var authObj = loadAuth();
    var userId = $('#unfollow').val();
    sendData(JSON.stringify(authObj), server + '/api/unfollow/' + userId);

    // TODO: only update on success response
    $('#submitSuccess').html('No longer following: ' + userId);
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
