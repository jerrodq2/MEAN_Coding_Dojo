app.controller('loginRegController', ['userFactory', '$location', '$cookies', function(fact, location, cookie){
  var self = this
  if(cookie.get('id')){
    location.url('/dashboard')
  }
  this.register = function(){
    fact.register(this.reg, function(str){
      self.regFlash = str
    })
  }
  this.login = function(){
    fact.login(this.log, function(str){
      self.loginFlash = str
    })
  }



}])



// *******************End*******************
