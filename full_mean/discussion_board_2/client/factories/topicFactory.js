
app.factory('topicFactory', ['$http', '$routeParams', '$location','$cookies', function(http, routeP, location, cookie){
  var factory ={};
  factory.find = function(callback){
    http.get('/find').then(function(response){
      callback(response.data)
    })
  }
  factory.getCat = function(callback){
    http.get('/categories').then(function(response){
      callback(response.data)
    })
  }
  factory.create = function(data, callback){
    data.userId = cookie.get('id')
    data.username = cookie.get('username')
    http.post('/createTopic', data).then(function(response){
      if(!response.data.message){
        callback(response.data.str)
      } else{
        callback('')
      }
    })
  }
  factory.topic = function(callback){
    http.get('/topic/'+routeP.id).then(function(response){
      callback(response.data)
    })
  }
  factory.addPost = function(data, tid, callback){
    data.tid = tid
    data.userId = cookie.get('id')
    data.username = cookie.get('username')
    http.post('/addPost', data).then(function(response){
      console.log(response.data);
      if(!response.data.message){
        callback(response.data.str)
      } else{
        callback('')
      }
    })
  }
  factory.addComment = function(data, pid, callback){
    data.pid = pid
    data.userId = cookie.get('id')
    data.username = cookie.get('username')
    http.post('/addComment', data).then(function(response){
      if(!response.data.message){
        callback(response.data.str)
      } else{
        callback('')
      }
    })
  }
  factory.like = function(pid, callback){
    http.get('/like/'+cookie.get('id')+'/'+pid).then(function(response){
      if(!response.data.message){
        callback(response.data.str)
      } else{
        callback('')
      }
    })
  }


  factory.logout = function(){
    cookie.remove('id')
    cookie.remove('username')
    location.url('/')
  }


  return factory;
}])




// *******************End*******************
