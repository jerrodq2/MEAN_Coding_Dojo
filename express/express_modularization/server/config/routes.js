var quotes = require('../controllers/quotes.js');
// This tells it to go up a folder(..) to the controllers and quotes.js, that's where we stored the logic, or the database functions.

//IMPORTANT Note: The below code is similar to how the routes.js file would look in a full mean app, but slightly different. In full mean, we don't render any pages, we just tell it which route to look out for, then point it at the controller. In a full mean app, a line in the routes.js file would look like: "app.post('/register', Users.register)", that's all, we just say, when someone posts to '/register', go to the register key/method in the Users controller, which we declare at the top of this file, just like "var quotes =..."
module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index')
  })
  app.post('/quotes', function(req,res){
    quotes.create(req, res)
  })
  app.get('/main', function (req, res) {
    quotes.show(req, res)
  })
}

// So now, this file just handles the routes, and the logic or database part is stored in quotes.js, we call the show and create functions on line 8 and 12 above.
