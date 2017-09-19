var app = angular.module('myApp', ['ngRoute']);

app.config(function ($routeProvider) {

$routeProvider
  .when('/', {
    templateUrl: 'partials/all.html'
  })
  .when('/new', {
    templateUrl: 'partials/new.html'
  })
  .when('/edit/:id', {
    templateUrl: 'partials/edit.html'
  })
  .when('/show/:id', {
    templateUrl: 'partials/show.html'
  })
  .otherwise('/');
})
