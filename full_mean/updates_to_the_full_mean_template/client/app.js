var app = angular.module('myApp', ['ngRoute', 'ngCookies'])

app.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}]);

app.config(function ($routeProvider) {

$routeProvider
  .when('/welcome', {
    templateUrl: 'partials/loginReg.html'
  })
  .when('/', {
    templateUrl: 'partials/users.html'
  })
  .otherwise('/');
})

//   // Setting a cookie
//   $cookies.put('myFavorite', 'oatmeal');
//    // Retrieving a cookie
//   var favoriteCookie = $cookies.get('myFavorite');
//    // Removing cookie
//    $cookies.remove('myFavorite')
