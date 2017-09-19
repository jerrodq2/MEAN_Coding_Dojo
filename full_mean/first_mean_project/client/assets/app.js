var app = angular.module('myApp', ['ngRoute']);
app.config(function ($routeProvider) {
// Routes to load your new and edit pages with new and edit controllers attached to them!
$routeProvider
  .when('/friends', {
    templateUrl: '../partials/new.html'
  })
  .when('/friends/:id', {
    templateUrl: '../partials/edit.html'
  })
  .otherwise({
          redirectTo: '/friends'
        });
})
