var app = angular.module('myApp', ['ngRoute', 'ngCookies'])

app.config(function ($routeProvider) {

$routeProvider
  .when('/', {
    templateUrl: 'partials/loginReg.html'
  })
  .when('/dashboard', {
    templateUrl: 'partials/dashboard.html'
  })
  .when('/topic/:id', {
    templateUrl: 'partials/topic.html'
  })
  .when('/user/:id', {
    templateUrl: 'partials/user.html'
  })
  .otherwise('/')
})


// *******************End*******************
