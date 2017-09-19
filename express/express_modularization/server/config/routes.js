// here we load the Quote model that we created on the server.js page
var quotes = require('../controllers/quotes.js');
// This tells it to go up a folder(..) to the controllers and quotes.js, that's where we stored the logic, or the database functions.
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
