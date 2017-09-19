app.controller('editController', ['orderFactory', '$location', function(fact, location){
  var self = this;
  this.order = {}
  fact.findOne(function(data){
    self.order = data
  })
  this.update = function(id){
    fact.update(id, this.updateOrder, function(str){
      self.flash = str
      self.updateOrder = {}
    })
  }

}])



// *******************End*******************
