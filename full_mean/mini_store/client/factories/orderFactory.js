
app.factory('orderFactory', ['$http', '$routeParams', '$location', function(http, routeP, location){
  var factory ={};
  factory.find = function(callback){
    http.get('/find/orders').then(function(response){
      callback(response.data)
    })
  }
  factory.create = function(data, callback){
    http.post('/create/order', data).then(function(response){
      if(!response.data.message){
        callback(response.data.str)
      } else{
        callback('')
      }
    })
  }
  factory.delete = function(id, callback){
    http.get('/delete/order/'+id).then(function(response){
      callback(response.data)
    })
  }
  factory.findOne = function(callback){
    http.get('/findOne/'+routeP.id).then(function(response){
      callback(response.data)
    })
  }
  factory.update = function(id, data, callback){
    http.post('/update/order/'+id, data).then(function(response){
      if(!response.data.message){
        callback(response.data.str)
      } else{
        callback('')
        location.url('/orders')
      }
    })
  }

  return factory;
}])




// *******************End*******************
