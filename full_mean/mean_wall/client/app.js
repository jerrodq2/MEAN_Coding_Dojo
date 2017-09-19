var app = angular.module('myApp', ['ngRoute', 'ngCookies', 'ngMessages']);

app.config(function ($routeProvider) {

$routeProvider
  .when('/main', {
    templateUrl: 'partials/main.html'
  })
  .when('/board', {
    templateUrl: 'partials/board.html'
  })
  .otherwise({
          redirectTo: '/main'
        });
})

//   // Setting a cookie
//   $cookies.put('myFavorite', 'oatmeal');
//    // Retrieving a cookie
//   var favoriteCookie = $cookies.get('myFavorite');
