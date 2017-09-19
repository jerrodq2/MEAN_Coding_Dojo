'use strict';

var appts = require('./../controllers/appts.js');

module.exports = function(app) {
	app.get('/appts', appts.get)
	app.post('/appts/new', appts.post)
	app.delete('/appts/:id', appts.delete);
};
