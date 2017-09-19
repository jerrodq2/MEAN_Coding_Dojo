app.controller('loginRegController', ['loginRegFactory', '$cookies', function(fact, cook){
  var self = this;
  
  this.register = function(){
    fact.register(this.reg, function(str){
      self.regFlash = str;
    })
  }
  this.login = function(){
    fact.login(this.log, function(str){
      self.loginFlash = str;
    })
  }

}])
