var appName = angular.module('myApp', ['ngRoute', 'ngCookies']);

appName.config(function ($routeProvider) {

$routeProvider
  .when('/friends', {
    templateUrl: 'partials/new.html'
  })
  .otherwise({
          redirectTo: '/friends'
        });
})
