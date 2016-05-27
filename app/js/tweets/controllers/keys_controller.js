module.exports = function(app) {
  app.controller('KeysController', ['$scope', '$http', '$cookies', '$location', '$rootScope', function($scope, $http, $cookies, $location, $rootScope) {

    var eat = $cookies.get('eat');
    if (!(eat && eat.length)) {
      $location.path('/signin');
    }
    $http.defaults.headers.common.token = eat;

    $scope.loadCookie = function() {
      var twetr = $cookies.get('twetr');
      if (twetr) {
        $scope.keys = JSON.parse(twetr);

        // alternative to reading auth from cookie?
        $rootScope = $scope.keys;
      }
    };

    $scope.loadCookie();

    $scope.saveKey = function(keys) {
      $cookies.put('twetr', JSON.stringify(keys));
    };

  }]);
};
