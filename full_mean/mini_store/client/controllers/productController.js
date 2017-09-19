app.controller('productController', ['productFactory', '$location', function(fact, location){
  var self = this
  this.products = []
  fact.find(function(data){
    self.products = data
  })
  this.create = function(){
    fact.create(this.newProduct, function(str){
      self.flash = str
      fact.find(function(data){
        self.products = data
      })
      self.newProduct={}
    })
  }
  this.delete = function(id){
    fact.delete(id)
    fact.find(function(data){
      console.log('try');
      self.products = data
    })
  }
}])



// *******************End*******************
