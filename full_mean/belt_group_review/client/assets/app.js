'use strict';

var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'partials/log_reg.html',
		controller: 'logregController',
		controllerAs: 'logregCtrlr'
	})
	.when('/home', {
		templateUrl: 'partials/home.html',
		controller: 'homeController',
		controllerAs: 'homeCtrlr'
	})
	.when('/new', {
		templateUrl: 'partials/new.html',
		controller: 'newController',
		controllerAs: 'newCtrlr'
	})
	.otherwise({
		redirectTo: '/'
	});
});
