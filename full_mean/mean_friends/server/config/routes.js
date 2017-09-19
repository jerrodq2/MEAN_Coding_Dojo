

var friend = require('../controllers/friends.js');
// ex: var quotes = require('../controllers/quotes.js');

module.exports = function(app){
  app.get('/friends', friend.find);
  app.get('/friends/show/:id', friend.findOne);
  app.get('/friends/edit/:id', friend.findOne);
  app.post('/friends/update/:id', friend.update);
  app.post('/friends/create', friend.create);
  app.get('/destroy/:id', friend.delete);
}
