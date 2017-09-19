'use strict';

app.controller('homeController', ['userFactory', 'apptFactory', '$location', function(userFactory, apptFactory, $location) {
	var self = this;
	self.searchText = '';
	self.appts = [];
	self.user = userFactory.getUser();

	// user not logged in
	if (!self.user) {
		$location.url('/');
	}
	
	self.appts = apptFactory.getAppts(function(appts) {
		self.appts = appts;
	});	
	
	self.newApptClick = function() {
		$location.url('/new');	
	};
	
	self.cancel = function (apptId) {
		apptFactory.cancel(apptId, function(appts) {			
			self.appts = appts;
		});
	};
	
	self.validDate = function(date) {
		return new Date() < new Date(date);
	}
	
	self.logout = function() {
		userFactory.remove(function() {
			$location.url('/');
		});
	};
}]);