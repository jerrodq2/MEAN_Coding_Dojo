
app.factory('productFactory', ['$http', '$routeParams', '$location', function(http, routeP, location){
  var factory ={};
  factory.find = function(callback){
    http.get('/find/products').then(function(response){
      callback(response.data)
    })
  }
  factory.create = function(data, callback){
    data.current_quantity = data.initial_quantity
    http.post('/create/product', data).then(function(response){
      if(!response.data.message){
        callback(response.data.str)
      } else{
        callback('')
      }
    })
  }
  factory.delete = function(id){
    http.get('/delete/product/'+id)
  }


  return factory;
}])




// *******************End*******************
