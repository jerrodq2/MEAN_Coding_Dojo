app.factory('loginRegFactory', ['$http', '$routeParams', '$location','$cookies', function(http, routeP, location, cookie){
  var factory = {};
  if(cookie.get('id')){
    location.url('/bids')
  }

  factory.register = function(data, callback){
    // Validations for convenience of the user
    if(angular.isUndefined(data)){
      return callback('All fields must be filled out.')
    } else if(angular.isUndefined(data.username) || data.username.length < 1){
      return callback("Username can't be blank.")
    } else if(angular.isUndefined(data.email) || data.email.length < 1){
      return callback("Email can't be empty")
    } else if(angular.isUndefined(data.password)){
      return callback("Password can't be blank")
    } else if(angular.isUndefined(data.confirm)){
      return callback("Confirmation Password can't be blank")
    } else if(data.password.length < 4){
      return callback('Password must be at least 4 characters long')
    } else if(data.password != data.confirm){
      return callback("Password and Confirmation password must match")
    }
    // End of validations
    http.post('/register', data).then(function(response){
      if(!response.data.message){
        callback(response.data.str)
      } else{
        cookie.put('id', response.data.id)
        cookie.put('username', response.data.username)
        callback('')
        location.url('/bids')
      }
    })
  }

  factory.login = function(data, callback){
    // Validations for convenience of the user
    if(angular.isUndefined(data)){
      return callback('All fields must be filled out')
    } else if(angular.isUndefined(data.username) || data.username.length < 1){
      return callback("Username can't be blank")
    } else if(angular.isUndefined(data.password) || data.password.length < 1){
      return callback("Password can't be blank")
    }
    // End of validations
    http.post('/login', data).then(function(response){
      if(!response.data.message){
        callback(response.data.str)
      } else{
        cookie.put('id', response.data.id)
        cookie.put('username', response.data.username)
        callback('')
        location.url('/bids')
      }
    })
  }


  return factory;
}])



// *******************End*******************
