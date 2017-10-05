app.factory('topicFactory', ['$http', '$routeParams', '$location','$cookies', function(http, routeP, location, cookie){
  var factory ={};

  if(!cookie.get('discussion_board_3_id')){
    location.url('/')
  }

  factory.logout = function(){
    http.get('/logout').then(function(response){
      cookie.remove('discussion_board_3_id')
      location.url('/')
    })
  }

  factory.find_topics = function(callback){
    http.get('/topics').then(function(response){
      callback(response.data.topics)
    })
  }

  factory.create_topic = function(data, callback){
    if (angular.isUndefined(data)) {
      return callback("All fields must be filled out")
    } else if (angular.isUndefined(data.title) || data.title.length < 4){
      return callback("Title must be at least 4 characters long")
    } else if (angular.isUndefined(data.description) || data.description.length < 1){
      return callback("Description can't be blank")
    } else if (data.description.length > 50){
      return callback("Description can't be longer than 20 characters, your description was " + data.description.length + " characters long")
    } else if (angular.isUndefined(data.category)){
      return callback("Category can't be blank")
    } else if (data.category != "General" && data.category != "Languages" && data.category != "Frameworks" && data.category != "Web Development" && data.category != "Other"){
      return callback("You must select one of the options from the category dropdown")
    }
    //end of validations
    http.post("/topics", data).then(function(response){
      if(!response.data.message){
        callback(response.data.str)
      } else {
        callback('')
        location.url('/main')
      }
    })
  }


  factory.delete = function(id, callback){
    http.get('/topics/' + id + '/destroy').then(function(response){
      callback(response.data.topics)
    })
  }


  factory.findOne = function(callback){
    http.get('/topics/'+routeP.id).then(function(response){
      callback(response.data)
    })
  }


  factory.create_comment = function(data, callback){
    if(angular.isUndefined(data)){
      return callback(false, "Comment can't be blank")
    } else if (angular.isUndefined(data.comment) || data.comment.length < 1){
      return callback(false, "Comment can't be blank")
    }
    data.topic_id = routeP.id
    http.post('/comments', data).then(function(response){
      if(!response.data.message){
        callback(false, response.data.str)
      } else {
        callback(true, response.data.topic)
      }
    })
  }


  factory.like = function(id, callback){
    http.get('/likes/'+ id + '/' + routeP.id).then(function(response){
      callback(response.data)
    })
  }



  return factory;
}])




// *******************End*******************
