module.exports = function(app) {
  app.controller('KeysController', ['$scope', '$http', '$cookies', '$location', '$rootScope', function($scope, $http, $cookies, $location, $rootScope) {

    $scope.loadCookie = function() {
      var twetr = $cookies.get('twetr');
      if (twetr) {
        $scope.keys = JSON.parse(twetr);
        $rootScope.rootKeys = $scope.keys;
      }
    };

    $scope.loadCookie();

    $scope.saveKey = function(keys) {
      $cookies.put('twetr', JSON.stringify(keys));
    };

  }]);
};
