module.exports = function(twetrApp) {
  twetrApp.config(['$routeProvider', function($route) {
    $route
      .when('/twetr', {
        templateUrl: '/templates/tweets/views/twetr_view.html'
      })
      .when('/signup', {
        templateUrl: '/templates/users/views/signupin_view.html',
        controller: 'SignupController'
      })
      .when('/signin', {
        templateUrl: '/templates/users/views/signupin_view.html',
        controller: 'SigninController'
      })
      .otherwise({
        redirectTo: '/signin'
      });
  }]);
};
