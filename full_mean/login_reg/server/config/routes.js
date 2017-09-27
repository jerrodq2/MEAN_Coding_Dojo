

var loginController = require('../controllers/startingController.js');
// ex: var quotes = require('../controllers/quotes.js');

//In the routes.js file, you declare the routes that the client side sends http requests to. The last part is the controller and method that you're routing it to. 
module.exports = function(app){
  app.post('/', loginController.create); // This route doesn't conflict with the index.html in view because that file is seen by express before this one, but if it was the other way around, express would use this route once we go to localhost:8000, which would cause problems, this route should be avoided in future mean apps
  app.post('/login', loginController.login);
}
