$(function() {
  function sendData(data) {
    $.ajax({
      url: '/api/tweet',
      type: 'POST',
      contentType: 'application/json',
      data: data,
      dataType: 'json'
    });
  }

  function loadCookies() {
    if (Cookies.get('keys')) {
      var keys = JSON.parse(Cookies.get('keys'));
      $('#consumer_key').val(keys.consumer_key);
      $('#consumer_secret').val(keys.consumer_secret);
      $('#access_token').val(keys.access_token);
      $('#access_token_secret').val(keys.access_token_secret);
    }
  }

  loadCookies();

  $('#submit').on('click', function(e) {
    var formData = JSON.parse(JSON.stringify($("#authForm").serializeArray()));
    var authObj = {};
    for (var i in formData) {
      if (formData[i].name) {
        authObj[formData[i].name] = formData[i].value;
      }
    }
    var str = JSON.stringify(authObj);
    console.log(authObj);
    e.preventDefault();
    sendData(str);
    $('#submitSuccess').html('Keys sent successfully!');
  });

  $('#saveKeys').on('click', function(e) {
    e.preventDefault();
    Cookies.set('keys', {
      consumer_key: $('#consumer_key').val(),
      consumer_secret: $('#consumer_secret').val(),
      access_token: $('#access_token').val(),
      access_token_secret: $('#access_token_secret').val()
    }, { expires: 365 });
    $('#saveSuccess').html('Keys saved!');
  });

});
