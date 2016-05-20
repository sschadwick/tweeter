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

  $('#submit').on('click', function(e) {
    e.preventDefault();
    var formData = JSON.parse(JSON.stringify($("#authForm").serializeArray()));
    var authObj = {};
    for (var i in formData) {
      if (formData[i].name)
        authObj[formData[i].name] = formData[i].value;
    }

    var str = JSON.stringify(authObj);
    sendData(str);
  });
});
