app.factory('loginRegFactory', ['$http', '$routeParams', '$location','$cookies', function(http, routeP, location, cookie){
  var factory = {};
  if(cookie.get('id')){
    location.url('/')
  }
  factory.check = function(){
    http.get('/check').then(function(response){
      console.log('first');
      console.log(response.data);
      console.log('first end');
    })
  }
  factory.register = function(data, callback){
    // Validations for convenience of the user
    if(angular.isUndefined(data)){
      return callback('All fields must be filled out.')
    } else if(angular.isUndefined(data.first_name) || data.first_name.length < 1){
      return callback("First Name can't be blank.")
    } else if(angular.isUndefined(data.last_name) || data.last_name.length < 1){
      return callback("Last Name can't be blank")
    } else if(angular.isUndefined(data.email) || data.email.length < 1){
      return callback("Email can't be blank")
    } else if(angular.isUndefined(data.password)){
      return callback("Password can't be blank")
    } else if(angular.isUndefined(data.confirm)){
      return callback("Confirmation Password can't be blank")
    } else if(data.password.length < 8){
      return callback('Password must be at least 8 characters long')
    } else if(data.password.length > 20){
      return callback("Password can't be longer than 20 characters")
    } else if(data.password != data.confirm){
      return callback("Password and Confirmation password must match")
    }
    // End of validations
    http.post('/register', data).then(function(response){
      if(!response.data.message){
        callback(response.data.str)
      } else{
        // cookie.put('id', response.data.id)
        callback('')
        location.url('/')
      }
    })
  }

  factory.login = function(data, callback){
    // Validations for convenience of the user
    if(angular.isUndefined(data)){
      return callback('All fields must be filled out')
    } else if(angular.isUndefined(data.email) || data.email.length < 1){
      return callback("Email can't be blank")
    } else if(angular.isUndefined(data.password) || data.password.length < 1){
      return callback("Password can't be blank")
    }
    // End of validations
    http.post('/login', data).then(function(response){
      if(!response.data.message){
        callback(response.data.str)
      } else{
        // cookie.put('id', response.data.id)
        callback('')
        location.url('/')
      }
    })
  }
  factory.logout = function(){
    http.get('/logout').then(function(response){
      console.log('logged out')
    })
  }


  return factory;
}])



// *******************End*******************
