var app = angular.module('myApp', ['ngRoute', 'ngCookies'])

app.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}]);
// I add the above code block because, as of angular 1.6.0, the route default hash-prefix changes from an emptry string ('') to the bang ('!'), which messes up my routes and causes angular-route to not work properly. The code block above restores the previous behavior so I don't have figure out how to change the rest of my routes accordingly. This line should be put after you declare your angularjs module, and before your angular routes below.

app.config(function ($routeProvider) {

$routeProvider
  .when('/welcome', {
    templateUrl: 'partials/loginReg.html'
  })
  .when('/', {
    templateUrl: 'partials/users.html'
  })
  .otherwise('/welcome')
})


// *******************End*******************



//   // Setting a cookie
//   $cookies.put('myFavorite', 'oatmeal')
//    // Retrieving a cookie
//   var favoriteCookie = $cookies.get('myFavorite')
//    // Removing cookie
//    $cookies.remove('myFavorite')
