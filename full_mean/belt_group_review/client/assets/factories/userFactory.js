'use strict';

app.factory('userFactory', ['$http', function($http) {
	var user = '';
	
	function UserFactory() {		
		this.login = function(userInfo, callback) {
			if (!userInfo) {
				callback({error: { errors: {name: {message: 'Login field required.' }}}});
				return;	
			}
			
			user = userInfo;
			callback();
		};
		
		this.getUser = function() {
			return user;
		};
		
		this.remove = function(callback) {
			user = '';
			callback();
		};
	}
	
	return new UserFactory();
}]);
