app.controller('userController', ['userFactory', '$location', '$cookies', function(fact, location, cookie){
  var self = this;
  if(!cookie.get('id')){
    location.url('/')
  }
  this.user = {}
  this.topics
  this.posts
  this.comments
  fact.userinfo(function(data){
    self.user = data.user
    self.topics = data.topics
    self.posts = data.posts
    self.comments = data.comments
  })
  this.logout = function(){
    cookie.remove('id')
    cookie.remove('username')
    location.url('/')
  }
}])



// *******************End*******************
