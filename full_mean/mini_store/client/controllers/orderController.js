app.controller('orderController', ['orderFactory', 'customerFactory', 'productFactory', '$location', function(fact, custom, product, location){
  var self = this
  this.orders = []
  this.customers = []
  this.products = []
  fact.find(function(data){
    self.orders = data
  })
  custom.find(function(data){
    self.customers = data
  })
  product.find(function(data){
    self.products = data
  })

  this.create = function(){
    fact.create(this.newOrder, function(str){
      self.flash = str
    })
    fact.find(function(data){
      self.orders = data
    })
    self.newOrder = {}
  }
  this.delete = function(id){
    fact.delete(id, function(data){

        console.log('finding...')
        self.orders = data
        console.log(self.orders)

    })
  }


}])



// *******************End*******************
