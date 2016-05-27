module.exports = function(app) {
  app.controller('TweetsController', ['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location) {
    var eat = $cookies.get('eat');
    if (!(eat && eat.length)){
      $location.path('/signin');
    }
    $http.defaults.headers.common.token = eat;

    var twetr = $cookies.get('twetr');
    console.log(twetr);

    $scope.description = 'Write or read reviews for your favorite books. You will enjoy this app. Do it. Do it now.';

    $scope.printDescription = function(description) {
      console.log('from the function: ' + description);
      console.log('from $scope: ' + $scope.description);
    };

    $scope.saveKey = function(keys) {
      console.log(keys);
      $cookies.put('twetr', keys);
      $http.defaults.headers.common.consumer_key = keys.consumer_key;
      $http.defaults.headers.common.consumer_secret = keys.consumer_secret;
      $http.defaults.headers.common.access_token = keys.access_token;
      $http.defaults.headers.common.access_token_secret = keys.access_token_secret;
      $scope.sendPOST('queue', function(res) {
        console.log(res);
      });
    };

    $scope.sendPOST = function(route, callback) {
      $http({
        method: 'GET',
        url: '/api/' + route
      })
        .then(function(res) {
          callback(res); // success
        }, function(res) {
          console.log(res); // failure
        });
    };

  }]);
};
