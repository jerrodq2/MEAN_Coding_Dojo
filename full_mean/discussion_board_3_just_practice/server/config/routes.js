var Users = require('../serverControllers/users.js')
var Topics = require('../serverControllers/topics.js')



module.exports = function(app){
  app.post('/users', Users.create)
  app.post('/login', Users.login)
  app.get('/logout', Users.logout)
  app.get('/users/:id/edit', Users.findOne)
  app.post('/users/:id', Users.update)
  app.post('/users/:id/update_password', Users.update_password)

  app.get('/topics', Topics.find)
  app.get('/topics/:id', Topics.findOne)
  app.get('/topics/:id/destroy', Topics.delete)
  app.get('/likes/:id/:topic_id', Topics.like)
  app.post('/topics', Topics.create)
  app.post('/comments', Topics.comment_create)

}

// *******************End*******************

// RESTFUL ROUTES BELOW-CRUD

// app.get('/users', Users.index)   //all users
// app.get('/users/:id', Users.show)    //show one user
// app.post('/users/create', Users.create)    //new user
// app.post('/users/update/:id', Users.update)    //updates a single user
// app.get('/users/destroy/:id', Users.delete)    //Deletes user
