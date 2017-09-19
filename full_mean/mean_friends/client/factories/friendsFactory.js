
app.factory('friendsFactory', ['$http', function($http){
  var factory ={};
  var friends = [];
  factory.index= function(callback){
    $http.get('/friends').then(function(data){
      friends = data.data;
      callback(friends);
    })
  }
  factory.create = function(data){
    $http.post('/friends/create', data)
  }
  factory.delete = function(id){
    $http.get('/destroy/'+id)
  }
  factory.show = function(id, callback){
    $http.get('/friends/show/'+id).then(function(data){
      callback(data.data)
    })
  }
  factory.update = function(id, user){
    $http.post('/friends/update/'+id, user)
  }
  return factory;
}])
