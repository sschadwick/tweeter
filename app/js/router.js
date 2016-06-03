module.exports = function(twetrApp) {
  twetrApp.config(['$routeProvider', function($route) {
    $route
      .when('/twetr', {
        templateUrl: '/templates/twetr_view.html'
      })
      .when('/signup', {
        templateUrl: '/templates/signupin_view.html',
        controller: 'SignupController'
      })
      .when('/signin', {
        templateUrl: '/templates/signupin_view.html',
        controller: 'SigninController'
      })
      .otherwise({
        redirectTo: '/signin'
      });
  }]);
};
