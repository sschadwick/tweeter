module.exports = function(app) {
  app.controller('TweetsController', ['$scope', 'Resource', '$http', '$cookies', '$location', function($scope, Resource, $http, $cookies, $location) {
    var eat = $cookies.get('eat');
    if (!(eat && eat.length))
      $location.path('/signup');

    $http.defaults.headers.common.token = eat;

  }]);
};
