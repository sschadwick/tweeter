module.exports = function(app) {
  app.run(['$rootScope', '$cookies', '$location', '$http', function($scope, $cookies, $location, $http) {

    $scope.loggedIn = function() {
      var eat = $cookies.get('eat');
      return eat && eat.length;
    };

    $scope.logOut = function() {
      $cookies.remove('eat');
      $location.path('/signin');
    };

    $scope.getUserName = function(callback) {
      $scope.userResult = '';
      var eat = $cookies.get('eat');
      if (!(eat && eat.length)) {
        callback(new Error('not logged in'));
      }
      $http({
        method: 'GET',
        url: '/api/username',
        headers: {
          token: eat
        }
      })
        .then(function(res) {
          $scope.username = res.data.username;
          $location.path('/twetr');
        }, function(res) {
          $scope.userResult = res.data.msg;
          $location.path('/signin');
        });
    };

    if ($scope.loggedIn()) {
      $scope.getUserName();
    }

  }]);
};
