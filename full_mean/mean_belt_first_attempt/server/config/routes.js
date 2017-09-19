

var Users = require('../ServerControllers/users.js');
var App = require('../ServerControllers/appointments.js');
// ex: var quotes = require('../controllers/quotes.js');

module.exports = function(app){
  app.post('/register', Users.register);
  app.post('/login', Users.login);
  app.post('/appointment/create', App.create);
  app.get('/appointments', App.index);
  app.post('/delete', App.delete);
  app.get('/appointments/edit/:id', App.edit);
  app.post('/update', App.update);
}
