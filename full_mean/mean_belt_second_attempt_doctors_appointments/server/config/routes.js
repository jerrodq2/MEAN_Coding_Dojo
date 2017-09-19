

var Users = require('../serverControllers/users.js')
var Appoint = require('../serverControllers/appointments.js')
// ex: var quotes = require('../controllers/quotes.js')

module.exports = function(app){
  app.post('/register', Users.register)
  app.post('/login', Users.login)
  app.get('/findAll', Appoint.findAll)
  app.get('/findOne/:id', Appoint.findOne)
  app.post('/create', Appoint.create)
  app.post('/update', Appoint.update)
  app.get('/destroy/:aid/:uid', Appoint.delete)
}

// *******************End*******************
