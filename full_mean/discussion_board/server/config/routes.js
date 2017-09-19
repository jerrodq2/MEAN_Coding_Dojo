
var User = require('../controllers/userController.js');
var Messages = require('../controllers/messagesController.js');
// ex: var quotes = require('../controllers/quotes.js');

module.exports = function(app){
  app.post('/reg', User.register);
  app.post('/login', User.login);
  app.get('/showOne/:id', User.findOne);
  app.get('/showTopics', Messages.findAll);
  app.post('/createTopic', Messages.createTopic);
  app.get('/topic/:id', Messages.findOne);
  app.post('/addMessage', Messages.addMessage);
  app.post('/addComment', Messages.addComment);
}
