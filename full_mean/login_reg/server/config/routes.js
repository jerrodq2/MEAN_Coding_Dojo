

var loginController = require('../controllers/startingController.js');
// ex: var quotes = require('../controllers/quotes.js');

module.exports = function(app){
  app.post('/', loginController.create);
  app.post('/login', loginController.login);
}
