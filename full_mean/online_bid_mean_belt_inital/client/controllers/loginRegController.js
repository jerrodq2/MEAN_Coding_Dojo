app.controller('loginRegController', ['loginRegFactory', function(fact){
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



}])



// *******************End*******************
