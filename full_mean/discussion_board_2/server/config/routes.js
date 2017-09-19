

var Users = require('../serverControllers/users.js')
var Topics = require('../serverControllers/topics.js')

module.exports = function(app){
  app.post('/register', Users.register)
  app.post('/login', Users.login)
  app.get('/userinfo/:id', Users.userinfo)
  app.get('/find', Topics.find)
  app.get('/topic/:id', Topics.topic)
  app.post('/createTopic', Topics.createTopic)
  app.post('/addPost', Topics.addPost)
  app.post('/addComment', Topics.addComment)
  app.get('/like/:uid/:pid', Topics.like)
  app.get('/categories', Topics.categories)
}

// *******************End*******************
