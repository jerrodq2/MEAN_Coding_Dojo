app.controller('dashboardController', ['topicFactory', '$cookies', function(fact, cookie){
  var self = this
  this.username = cookie.get('username')
  this.topics
  this.categories
  fact.find(function(data){
    self.topics = data
  })
  fact.getCat(function(data){
    self.categories = data
  })
  this.create = function(){
    fact.create(this.newTopic, function(str){
      self.flash = str
      self.newTopic = {}
      fact.find(function(data){
        self.topics = data
      })
    })
  }
  this.logout = function(){
    fact.logout()
  }



}])



// *******************End*******************
