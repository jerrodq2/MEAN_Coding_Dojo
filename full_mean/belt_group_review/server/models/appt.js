'use strict';

var mongoose = require('mongoose');

var ApptSchema = new mongoose.Schema({
	userName: {
		type: String,
		required: [true, 'userName required to persist an appt.']
	},
	date: {
		type: Date,
		required: [true, 'date required to persist an appt.']
	}, 
	time: {
		type: Date,
		required: [true, 'time required to persist an appt.']
	},
	complain: {
		type: String,
		required: [true, 'complaint required to persist an appt.']
	}
}, { timestamps: true });

mongoose.model('Appt', ApptSchema);
