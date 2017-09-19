'use strict';

app.factory('apptFactory', ['$http', function($http) {	
	function ApptFactory() {		
		this.getAppts = function(callback) {			
			console.log('apptFactory.js getAppts(): retrieving appts...');
			$http.get('/appts')
			.then(function(response) {
				if (response.data.error) {
					// error occurred
					console.log('apptFactory.js get(): error retrieving appts, error ->', response.data.error);
				} else {
					console.log('apptFactory.js get(): response.data ->', response.data);
					callback(response.data);
				}
			});
		};
		
		this.create = function (appt, callback) {
			console.log('apptFactory.js create(): appt ->', appt);
			$http.post('/appts/new', appt)
			.then(function(response) {
				if (response.data.error) {
					callback(response.data);
				} else {
					console.log('apptFactory.js create(): response.data ->', response.data);
					callback();
				}
			});
		};
		
		this.cancel = function(id, callback) {
			console.log('apptFactory.js cancel(): removing appt...');
			$http.delete('/appts/' + id)
			.then(function(response) {
				if (response.data.error) {
					console.log('apptFactory.js cancel(): error canceling appt, error ->', response.data.error);
				} else {
					console.log('apptFactory.js cancel(): response.data ->', response.data);
					callback(response.data);
				}
			});
		};
	};
	
	return new ApptFactory();
}]);
