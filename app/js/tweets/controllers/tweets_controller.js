module.exports = function(app) {
  app.controller('TweetsController', ['$scope', '$http', '$cookies', '$location', '$rootScope', function($scope, $http, $cookies, $location, $rootScope) {
    var eat = $cookies.get('eat');
    if (!(eat && eat.length)) {
      $location.path('/signin');
    }

    $http.defaults.headers.common.token = eat;

    $scope.schedule = {
      selectTime: null,
      availableOptions: []
    };

    $scope.reloadSchedule = function() {
      $scope.freq = '*/' + $scope.schedule.selectTime + ' * * * *';
    };

    $scope.loadOptions = function() {
      for (var i = 0; i < 60; i++) {
        var obj = {id: (i + 1).toString(), name: (i + 1)};
        $scope.schedule.availableOptions.push(obj);
      }
      // Default to 15 minute interval
      $scope.schedule.selectTime = $scope.schedule.availableOptions[14].id;
      $scope.reloadSchedule();
    };
    $scope.loadOptions();

    $scope.loadKeys = function() {
      var keys = $rootScope.rootKeys;
      if (keys) {
        $http.defaults.headers.common.consumer_key = keys.consumer_key;
        $http.defaults.headers.common.consumer_secret = keys.consumer_secret;
        $http.defaults.headers.common.access_token = keys.access_token;
        $http.defaults.headers.common.access_token_secret = keys.access_token_secret;
      }
    };

    $scope.sendPOST = function(route, data, callback) {
      $scope.loadKeys();
      $http({
        method: 'POST',
        url: '/api/' + route,
        data: data
      })
        .then(function(res) {
          callback(res); // success
        }, function(res) {
          $scope.err = res.data.msg; // failure
        });
    };

    $scope.sendGET = function(route, callback) {
      $scope.loadKeys();
      $http({
        method: 'GET',
        url: '/api/' + route,
      })
        .then(function(res) {
          callback(res);
        }, function(res) {
          $scope.err = res.data.msg;
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
        $scope.result = 'Successful Retweet! Original Tweet ID: ' + id;
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
      $scope.sendPOST('usernameToId/' + username, {}, function(res) {
        $scope.result = 'That users ID is: ' + res.data.msg.id_str;
      });
    };

    $scope.submitAutoTweet = function(sub, freq) {
      $scope.sendPOST('addCron', {cron: freq, scrape: sub}, function(res) {
        $scope.result = res.data.msg;
        $scope.updateQueue();
      });
    };

    $scope.submitDeleteTask = function(taskID) {
      $scope.sendGET('deleteCron/' + taskID, function(res) {
        $scope.result = res.data.msg;
        $scope.updateQueue();
      });
    };

    $scope.submitSearch = function(str) {
      $scope.sendPOST('search', {str: str}, function(res) {
        $scope.searchRes = res.data.msg.statuses;
      });
    };

    $scope.updateQueue = function() {
      $scope.sendGET('queue', function(res) {
        $scope.queueRes = res.data.msg;
      });
    };
    $scope.updateQueue();

  }]);
};
