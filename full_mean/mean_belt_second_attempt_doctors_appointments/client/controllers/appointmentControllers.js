app.controller('mainAppointmentController', ['appointmentFactory', '$location', function(fact, location){
  var self = this;
  this.apps
  this.id
  fact.find(function(data, userID){
    self.apps = data
    self.id = userID
  })
  this.create =  function(){
    fact.create(this.newApp, function(str){
      self.createFlash = str
    })
  }
  this.delete = function(aid){
    fact.delete(aid)
    fact.find(function(data){
      self.apps = data
    })
  }
  this.futureDate = function(date){
    return new Date() < new Date(date)
    // this return true if the date passed in is greater than the current date, or rather if the date passed in is a future date
  }
  this.logout = function(){
    fact.logout()
  }
}])

app.controller('editAppointmentController', ['appointmentFactory', '$location', function(fact, location){
  var self = this;
  this.one;
  fact.findOne(function(data){
    self.one = data
  })
  this.logout = function(){
    fact.logout()
  }
  this.update = function(aid){
    fact.update(this.newInfo, aid, function(str){
      self.updateFlash = str
    })
  }


}])



// *******************End*******************
