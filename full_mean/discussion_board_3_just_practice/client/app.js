var app = angular.module('myApp', ['ngRoute', 'ngCookies']) // add/remove other depedent modules here

app.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}]);


app.config(function ($routeProvider) {

$routeProvider
  .when('/', {
    templateUrl: 'partials/loginReg.html'
  })
  .when('/main', {
    templateUrl: 'partials/main.html'
  })
  .when('/users/:id', {
    templateUrl: 'partials/edit_user.html'
  })
  .when('/topics/new', {
    templateUrl: 'partials/new_topic.html'
  })
  .when('/topics/:id', {
    templateUrl: 'partials/topic_show.html'
  })
  .otherwise('/');
})


// .constant('AUTH_EVENTS', {
//   loginSuccess: 'auth-login-success',
//   loginFailed: 'auth-login-failed',
//   logoutSuccess: 'auth-logout-success',
//   sessionTimeout: 'auth-session-timeout',
//   notAuthenticated: 'auth-not-authenticated',
//   notAuthorized: 'auth-not-authorized'
// })
