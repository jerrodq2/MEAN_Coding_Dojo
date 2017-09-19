

var Users = require('../controllers/users.js');
var Messages = require('../controllers/messages.js')
// ex: var quotes = require('../controllers/quotes.js');

module.exports = function(app){
  app.post('/register', Users.register);
  app.post('/login', Users.login);
  app.get('/messages', Messages.find);
  app.post('/create', Messages.create);
  app.post('/add', Messages.newComment);
}
