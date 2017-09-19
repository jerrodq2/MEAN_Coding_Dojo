app.factory('friendsFactory', ['$http', function($http){
  var friends = [];
  var factory = {};

  factory.index = function(callback){
    $http.get('/friends').then(function(returned_data){
      friends = returned_data.data;
      callback(friends)
    })
  }
  factory.create = function(data){
    console.log('Start')
    console.log(data)
    console.log('End FACTORY')
    $http.post('/friends', data).then(function(returned_data){
      console.log(returned_data)
    })

  }

  return factory;
}])
