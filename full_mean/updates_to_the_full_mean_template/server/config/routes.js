

var Users = require('../serverControllers/users.js')
// ex: var quotes = require('../controllers/quotes.js')

module.exports = function(app){
  app.post('/register', Users.register)
  app.post('/login', Users.login)
}

// *******************End*******************

// RESTFUL ROUTES BELOW-CRUD

// app.get('/users', Users.index)   //all users
// app.get('/users/:id', Users.show)    //show one user
// app.post('/users/create', Users.create)    //new user
// app.post('/users/update/:id', Users.update)    //updates a single user
// app.get('/users/destroy/:id', Users.delete)    //Deletes user
