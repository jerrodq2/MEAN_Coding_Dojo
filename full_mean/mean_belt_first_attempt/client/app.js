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

  //Notice below how I use "/:id" this is an example of a route parameter, format as follows - ":param_name", you access it with routeParams as shown in the appointment Factory under the editOne method
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
