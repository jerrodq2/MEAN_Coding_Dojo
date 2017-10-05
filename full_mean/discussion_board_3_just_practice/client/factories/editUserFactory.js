app.factory('editUserFactory', ['$http', '$routeParams', '$location','$cookies', function(http, routeP, location, cookie){
  var factory ={};

  factory.logout = function(){
    http.get('/logout').then(function(response){
      cookie.remove('discussion_board_3_id')
      location.url('/')
    })
  }


  factory.findOne = function(callback){
    http.get('/users/' + routeP.id + '/edit').then(function(response){
      if(!response.data.message)
        callback(false, response.data.str)
      callback(true, response.data.user)
    })
  }


  factory.edit_user = function(data, callback){
    if(angular.isUndefined(data)){
      return callback('All fields must be filled out.')
    } else if(angular.isUndefined(data.username) || data.username.length < 2){
      return callback("Username can't be blank")
    } else if(angular.isUndefined(data.email) || data.email.length < 1){
      return callback("Email can't be blank")
    }
    http.post('/users/' + routeP.id, data).then(function(response){
      callback(response.data.str)
    })
  }


  factory.edit_pass = function(data, callback){
    if(angular.isUndefined(data)){
      return callback('All fields must be filled out.')
    } else if(angular.isUndefined(data.old_password)){
      return callback("Old Password can't be blank")
    } else if(angular.isUndefined(data.password)){
      return callback("New Password can't be blank")
    } else if(angular.isUndefined(data.confirm)){
      return callback("Confirmation Password can't be blank")
    } else if(data.password.length < 4){
      return callback('New Password must be at least 4 characters long')
    } else if(data.password != data.confirm){
      return callback("New Password and Confirmation password must match")
    }
    http.post('/users/' + routeP.id + '/update_password', data).then(function(response){
      callback(response.data.str)
    })
  }



  return factory;
}])




// *******************End*******************
