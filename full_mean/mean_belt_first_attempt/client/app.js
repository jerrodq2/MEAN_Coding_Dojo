var app = angular.module('myApp', ['ngRoute', 'ngCookies']);

app.config(function ($routeProvider) {

$routeProvider
  .when('/welcome', {
    templateUrl: 'partials/loginReg.html'
  })
  .when('/', {
    templateUrl: 'partials/appointments.html'
  })
  .when('/create', {
    templateUrl: 'partials/create.html'
  })
  .when('/edit/:id', {
    templateUrl: 'partials/edit.html'
  })
  .otherwise('/welcome');
})

//   // Setting a cookie
//   $cookies.put('myFavorite', 'oatmeal');
//    // Retrieving a cookie
//   var favoriteCookie = $cookies.get('myFavorite');
//    // Removing cookie
//    $cookies.remove('myFavorite')
