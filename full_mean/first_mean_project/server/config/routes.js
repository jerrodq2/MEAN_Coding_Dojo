
var path = require('path');
var friends = require('../controllers/friends.js');
// ex: var quotes = require('../controllers/quotes.js');

module.exports = function(app){
  app.get('/friends', friends.showAll);
  app.get('/friends/:id', friends.showOne);
  app.post('/friends', friends.create);
  app.put('/friends/update/:id', friends.update);
  app.delete('/friends/destroy/:id', friends.delete);
}
