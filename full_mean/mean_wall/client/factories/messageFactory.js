app.factory('messageFactory', ['$http', function($http){
  var factory ={};
  factory.show = function(callback){
    $http.get('/messages').then(function(response){
      callback(response.data)
    })
  }
  factory.create = function(data, callback){
    $http.post('/create', data).then(function(response){
      callback(response.data)
    })
  }
  factory.add = function(data, callback){
    $http.post('/add', data).then(function(response){
      callback(response.data)
    })
  }
  return factory;
}])
