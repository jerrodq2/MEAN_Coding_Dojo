var app = angular.module('myApp');

app.controller('editController', ['$routeParams', function($routeParams){
  console.log('editController loaded')
  console.log("$routeParams currently looks like this:", $routeParams);
}])
