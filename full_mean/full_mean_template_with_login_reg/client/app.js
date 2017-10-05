var app = angular.module('myApp', ['ngRoute', 'ngCookies']) // add/remove other depedent modules here

app.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}]);

//example of routes below
app.config(function ($routeProvider) {

$routeProvider
  .when('/', {
    templateUrl: 'partials/loginReg.html'
  })
  .when('/main', {
    templateUrl: 'partials/users.html'
  })
  .otherwise('/');
})

  /* example of angular cookies below:

  // Setting a cookie
  $cookies.put('myFavorite', 'oatmeal');

   // Retrieving a cookie
  var favoriteCookie = $cookies.get('myFavorite');

   // Removing cookie
   $cookies.remove('myFavorite')

   //Setting a cookie with an expiration date of 2 minutes (there are other methods you could use)
   var today = new Date()
   var date_to_expire = new Date(today)
   date_to_expire.setSeconds(today.getSeconds() + 120)
   $cookies.put('myFavorite', 'oatmeal', {'expires': date_to_expire})

   */
