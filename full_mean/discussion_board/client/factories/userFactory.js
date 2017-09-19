
app.factory('userFactory', ['$http', '$routeParams', '$location', '$cookies', function(http, routeP, location, cook){
  var factory ={};
  factory.register = function(data, callback){
    http.post('/reg', data).then(function(response){
      if(!response.data.message){
        callback({message: false})
      } else{
        cook.put('id', response.data.id)
        cook.put('username', response.data.username)
        callback({message: true})
      }
    })
  }
  factory.login = function(data, callback){
    http.post('/login', data).then(function(response){
      if(!response.data.message){
        callback({message: false})
      } else{
        cook.put('id', response.data.id)
        cook.put('username', response.data.username)
        callback({message: true})
      }
    })
  }
  factory.show = function(callback){
    http.get('/showOne/'+routeP.id).then(function(response){
      callback({user: response.data.userinfo, topics: response.data.topics.length, messages: response.data.messages.length, comments: response.data.comments.length})
    })
  }
  factory.logout = function(){
    cook.remove('id');
    cook.remove('username');
    location.url('/');
  }
  return factory;
}])
