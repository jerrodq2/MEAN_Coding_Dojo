

var Users = require('../serverControllers/users.js')
var Bids = require('../serverControllers/bids.js')

module.exports = function(app){
  app.post('/register', Users.register)
  app.post('/login', Users.login)
  app.post('/bid', Bids.bid)
  app.get('/find', Bids.find)
  app.get('/reset', Bids.reset)
}

// *******************End*******************
