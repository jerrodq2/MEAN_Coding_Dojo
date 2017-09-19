var app = angular.module('myApp', ['ngRoute', 'ngCookies']);

app.config(function ($routeProvider) {

$routeProvider
  .when('/', {
    templateUrl: 'partials/loginReg.html'
  })
  .when('/main', {
    templateUrl: 'partials/main.html'
  })
  .when('/topic/:id', {
    templateUrl: 'partials/topic.html'
  })
  .when('/user/:id', {
    templateUrl: 'partials/user.html'
  })
  .otherwise('/');
})

//   // Setting a cookie
//   $cookies.put('myFavorite', 'oatmeal');
//    // Retrieving a cookie
//   var favoriteCookie = $cookies.get('myFavorite');
//    // Removing cookie
//    $cookies.remove('myFavorite')
