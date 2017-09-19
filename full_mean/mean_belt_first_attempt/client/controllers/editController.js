app.controller('editController', ['appointmentFactory', function(fact){
  var self = this;
  fact.editOne(function(data){
    self.info = data;
  })
  this.update = function(aid){
    fact.update(aid, this.updateInfo, function(str){
      self.flash = str
    });
  }


}])
