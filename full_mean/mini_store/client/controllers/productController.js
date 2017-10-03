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
        //After I create the new product, I have to update the products shown on the page to reflect it, this method does that. Otherwise, the newly created product wouldn't be shown, or I would have to redirect the page to get it reloaded, this is more efficient.
      })

      self.newProduct={} //Since the page doesn't get reloaded, the form inputs would stay the same since they are tied to "this.newProduct" via ng-model, this resets the form inputs, basically clearing it out.
    })

  }
  this.delete = function(id){
    fact.delete(id, function(){

      fact.find(function(data){
        self.products = data //Like the above method, this updates the products shown on the page so the deleted product is no longer shown and you don't have to reload the page. 
      })

    })
  }
}])



// *******************End*******************
