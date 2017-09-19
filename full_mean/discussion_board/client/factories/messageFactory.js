
app.factory('messagesFactory', ['$http', '$routeParams', '$location','$cookies', function(http, routeP, location, cook){
  var factory ={};
  if(!cook.get('id')){
    location.url('/')
  }
  factory.createTopic = function(data, callback){
    data.username = cook.get('username')
    data.userId = cook.get('id')
    http.post('/createTopic', data).then(function(response){
      callback(response.data.message)
    })
  }
  factory.findAll = function(callback){
    http.get('/showTopics').then(function(response){
      callback(response.data)
    })
  }
  factory.findOne = function(callback){
    http.get('/topic/'+routeP.id).then(function(response){
      callback(response.data)
    })
  }
  factory.logout = function(){
    cook.remove('id');
    cook.remove('username');
    location.url('/')
  }
  factory.addMessage = function(message, tid, callback){
    var data = {message: message, _topic: tid, userId: cook.get('id'), username: cook.get('username')}
    http.post('/addMessage', data).then(function(response){
      callback(response.data);
    })
  }
  factory.addComment = function(mid, comment, callback){
    var data = {_message: mid, comment: comment, username: cook.get('username'), userId: cook.get('id')};
    http.post('/addComment', data).then(function(response){
      callback(response.data)
    })
  }
  return factory;
}])
