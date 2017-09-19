
app.factory('customerFactory', ['$http', '$routeParams', '$location', function(http, routeP, location){
  var factory ={};
  factory.find = function(callback){
    http.get('/find/customers').then(function(response){
      callback(response.data)
    })
  }
  factory.create = function(data, callback){
    http.post('/create/customer', data).then(function(response){
      if(!response.data.message){
        callback(response.data.str)
      } else{
        callback('')
      }
    })
  }
  factory.delete = function(id){
    http.get('/delete/customer/'+id)
  }

  return factory;
}])




// *******************End*******************
