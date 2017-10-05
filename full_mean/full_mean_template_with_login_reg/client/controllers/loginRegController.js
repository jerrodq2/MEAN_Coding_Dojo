app.controller('loginRegController', ['loginRegFactory', '$cookies', function(fact, cookies){
  var self = this

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

  //The below method should probably be moved to another controller
  this.logout = function(){
    fact.logout()
  }


}])



// *******************End*******************
