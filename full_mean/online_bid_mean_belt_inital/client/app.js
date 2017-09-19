var app = angular.module('myApp', ['ngRoute', 'ngCookies'])

app.config(function ($routeProvider) {

$routeProvider
  .when('/loginReg', {
    templateUrl: 'partials/loginReg.html'
  })
  .when('/bids', {
    templateUrl: 'partials/bids.html'
  })
  .when('/result', {
    templateUrl: 'partials/result.html'
  })
  .otherwise('/loginReg')
})


// *******************End*******************
