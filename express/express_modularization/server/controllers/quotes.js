var mongoose = require('mongoose');
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
