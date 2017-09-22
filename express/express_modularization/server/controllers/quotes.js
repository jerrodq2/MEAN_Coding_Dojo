var mongoose = require('mongoose');
//All controller files need to require mongoose at the top of the page, before the models
var Quote = mongoose.model('Quote');
// Even though Quote is defined in server.js, either the scope doesn't let it be used here, or something else along those lines, so we have to re-declare it on this page to use it.
module.exports = {
  show: function(req, res) {
    Quote.find({}, function(err, quotes) {
      res.render('main', {quotes: quotes});
    })
  },
  create: function(req, res) {
    var quote = new Quote(req.body);
    quote.save(function(err) {
      if(err){
        console.log("something went wrong");
      } else {
        res.redirect('/main');
      }
    })
  }
}
//the bulk of the controller file, or the part that actually does the server side logic and database work, is exported as a giant javacript object, which is then required in the routes.js file
