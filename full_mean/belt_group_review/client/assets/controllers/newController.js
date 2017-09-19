'use strict';

app.controller('newController', ['userFactory', 'apptFactory', '$location', function(userFactory, apptFactory, $location) {
	var self = this;
	self.appt = {};
	self.user = userFactory.getUser();
	
	if (!self.user) {
		$location.url('/');
	}
	
	self.addAppointment = function() {
		// add user info to appt
		self.appt.userName = self.user;
		
		apptFactory.create(self.appt, function(response) {
			if (response) {
				/* errors occurred */
				console.log('newController.js addAppointment(): reponse ->', response);
			} else {
				console.log('newController.js addAppointment(): redirecting back to home...');
				$location.url('/home');
			}
		});
	}
}]);
