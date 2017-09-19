
app.factory('userFactory', ['$http', function($http){
  var factory ={};
  factory.register = function(data, callback){
    $http.post('/register', data).then(function(response){
      callback(response.data);
    })
  }
  factory.login = function(data, callback){
    $http.post('/login', data).then(function(response){
      callback(response.data)
    })
  }
  return factory;
}])
