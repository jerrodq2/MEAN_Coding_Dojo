app.controller('customerController', ['customerFactory', '$location', function(fact, location){
  var self = this
  this.customers = []
  fact.find(function(data){
    self.customers = data
  })
  this.create = function(){
    fact.create(this.newCustomer, function(str){
      self.flash = str
      fact.find(function(data){
        self.customers = data
      })
      self.newCustomer = {}
    })
  }
  this.delete = function(id){
    fact.delete(id)
    fact.find(function(data){
      self.customers = data
    })
  }


}])



// *******************End*******************
