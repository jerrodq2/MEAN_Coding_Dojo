app.controller('appointmentsController', ['appointmentFactory', function(fact){
  var self =this;
  this.logout = function(){
    fact.logout()
  }
  fact.show(function(data){
    self.info = data;
  })
  this.create = function(){
    fact.create(this.newAppoint, function(str){
      self.flashCreate = str;
    })
  }
  this.delete = function(aid){
      fact.delete(aid, function(response){
        if(response){
          fact.show(function(data){
            self.info = data;
          })
        }
      });
  }



}])
