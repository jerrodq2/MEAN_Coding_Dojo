'use strict';

var mongoose = require('mongoose');
var Appt = mongoose.model('Appt');

function ApptsController() {
	var getAppts = function() {
			
	};
	
	this.get = function(req, res) {
		Appt.find({}, function(error, appts) {
			if (error) {
				console.log('appts.js getAppts(): error retrieving appts\n', error);
				res.json({ error: error });
			} else {
				res.json(appts);
			}
		});
	};
	
	this.post = function(req, res) {		
		var newAppt = new Appt({
			userName: req.body.userName,
			date: req.body.date,
			time: req.body.time,
			complain: req.body.complain
		});
		
		newAppt.save(function(error, appt) {
			if (error) {
				console.log('appts.js new(): error creating appt\n', error);
				res.json({ error: error });
			} else {
				res.json({ message: 'successfully saved appt.' });
			}
		})
	};
	
	this.delete = function(req, res) {
		if (!req.params.id) {
			console.log('appts.js delete(): no id available, no db actions occurring.');	
			return;
		}
		
		Appt.remove({_id: req.params.id}, function(error) {
			if (error) {
				console.log('appts.js delete(): error deleting appt\n', error);
				res.json({ error: error });
			} else {
				Appt.find({}, function(error, appts) {
					if (error) {
						console.log('appts.js getAppts(): error retrieving appts\n', error);
						res.json({ error: error });
					} else {
						res.json(appts);
					}
				});
			}
		});
	}
};

module.exports = new ApptsController();
