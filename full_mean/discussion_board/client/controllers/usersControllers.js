app.controller('loginRegController', ['userFactory', '$location', '$cookies', function(fact, location, cook){
  var self = this;
  if(cook.get('id')){
    location.url('/main')
  }
  this.register = function(){
    fact.register(this.reg, function(data){
      if(!data.message){
        self.regFlash = 'Username already in database, please login in'
      } else{
        location.url('/main')
      }
    })
  }
  this.login = function(){
    fact.login(this.log, function(data){
      if(!data.message){
        self.loginFlash = 'Username or password incorrect'
      } else{
        location.url('/main')
      }
    })
  }

}])


app.controller('showController', ['userFactory', '$cookies',function(fact, cook){
  var self = this;
  if(!cook.get('id')){
    location.url('/')
  }
  this.user = {};
  this.data = {};
  fact.show(function(response){
    self.user = response.user;
    self.data = {topics: response.topics, messages: response.messages, comments: response.comments}
  })

  this.logout = function(){
    fact.logout();
  }
}])
