'use strict';

app.controller('logregController', ['userFactory', '$location', function(userFactory, $location) {
	var self = this;
	self.logUser = '';
	self.errName = '';

	self.login = function() {	
		userFactory.login(self.logUser, function(response) {
			console.log(response);
			if (response) {
				self.errName = response.error.errors.name ? response.error.errors.name.message : '';
			} else {
				$location.url('/home');
			}
		});
	};
}]);

