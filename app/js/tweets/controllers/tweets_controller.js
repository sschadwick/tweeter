module.exports = function(app) {
  app.controller('TweetsController', ['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location) {
    var eat = $cookies.get('eat');
    if (!(eat && eat.length)) {
      $location.path('/signin');
    }

    $scope.loadCookie = function() {
      var twetr = $cookies.get('twetr');
      if (twetr) {
        var keys = JSON.parse(twetr);
        $http.defaults.headers.common.consumer_key = keys.consumer_key;
        $http.defaults.headers.common.consumer_secret = keys.consumer_secret;
        $http.defaults.headers.common.access_token = keys.access_token;
        $http.defaults.headers.common.access_token_secret = keys.access_token_secret;
      }
    };

    $http.defaults.headers.common.token = eat;

    $scope.sendPOST = function(route, data, callback) {
      $scope.loadCookie();

      $http({
        method: 'POST',
        url: '/api/' + route,
        data: data
      })
        .then(function(res) {
          callback(res); // success
        }, function(res) {
          console.log(res); // failure
        });
    };

    $scope.sendGET = function(route, callback) {
      $scope.loadCookie();

      $http({
        method: 'GET',
        url: '/api/' + route,
      })
        .then(function(res) {
          callback(res);
        }, function(res) {
          console.log(res);
        });
    };

    $scope.submitTweet = function(status) {
      $scope.sendPOST('tweet', {status: status}, function(res) {
        $scope.result = 'Successful tweet! Tweet ID: ' + res.data.msg.id_str;
      });
    };

    $scope.submitUntweet = function(id) {
      $scope.sendPOST('untweet/' + id, {}, function(res) {
        $scope.result = 'Successfully deleted tweet! Tweet ID: ' + res.data.msg.id_str;
      });
    };

    $scope.submitRetweet = function(id) {
      $scope.sendPOST('retweet/' + id, {}, function(res) {
        $scope.result = 'Successful Retweet! Original Tweet ID: ' + id + ', Retweet ID: '
      });
    };

    $scope.submitUnretweet = function(id) {
      $scope.sendPOST('unretweet/' + id, {}, function(res) {
        $scope.result = 'Successfully deleted that retweet!';
      });
    };

    $scope.submitFollow = function(usrId) {
      $scope.sendPOST('follow/' + usrId, {}, function(res) {
        $scope.result = 'Now following user: ' + res.data.msg.id_str;
      });
    };

    $scope.submitUnfollow = function(usrId) {
      $scope.sendPOST('unfollow/' + usrId, {}, function(res) {
        $scope.result = 'No longer following user: ' + res.data.msg.id_str;
      });
    };

    $scope.submitConvert = function(username) {
      $scope.sendPOST('username/' + username, {}, function(res) {
        $scope.result = 'That users ID is: ' + res.data;
      });
    };

    $scope.submitAutoTweet = function(sub, freq) {
      $scope.sendPOST('addCron', {cron: freq, subreddit: sub}, function(res) {
        $scope.result = 'That task is now started - Task ID: ' + res.data;
      });
    };

    $scope.submitDeleteTask = function(taskID) {
      $scope.sendGET('deleteCron/' + taskID, function(res) {
        $scope.result = 'That task is not deleted';
      });
    };

  }]);
};
