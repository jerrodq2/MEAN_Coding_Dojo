

var Users = require('../ServerControllers/users.js');
var App = require('../ServerControllers/appointments.js');
// ex: var quotes = require('../controllers/quotes.js');

module.exports = function(app){
  app.post('/register', Users.register);
  app.post('/login', Users.login);
  app.post('/appointment/create', App.create);
  app.get('/appointments', App.index);
  app.post('/delete', App.delete);

  //Below, i create a route paramter with ":param_name" just like I do in a partail route, there both still url routes and use the same paramter format, next see appointments.js in ServerControllers to see how we access it in the server.
  app.get('/appointments/edit/:id', App.edit);
  app.post('/update', App.update);
}
