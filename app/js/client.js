require('angular/angular');
require('angular-route');
require('angular-base64');
require('angular-cookies');
var angular = window.angular;

var twetrApp = angular.module('twetrApp', ['ngRoute', 'base64', 'ngCookies']);

require('./tweets/tweets')(twetrApp);
require('./users/users')(twetrApp);
require('./logout')(twetrApp);
require('./router')(twetrApp);
