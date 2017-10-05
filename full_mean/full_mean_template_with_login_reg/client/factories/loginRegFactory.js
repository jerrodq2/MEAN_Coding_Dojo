app.factory('loginRegFactory', ['$http', '$routeParams', '$location','$cookies', function(http, routeP, location, cookie){
  var factory = {};

  //You should change the name of this and the other cookies, the name is how the browser identifies it, so if another project created a cookie named "id", then it would be seen in the if statement below, but not if I changed the below code to something like "cookie.get('project_name_id')"
  if(cookie.get('id')){
    location.url('/main')
  }

  factory.register = function(data, callback){
    //start of register validations
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
    } else if(angular.isUndefined(data.remembered)){
      data.remembered = false
    } else if(data.remembered != true && data.remembered != false){
      return callback("Nice try there guy.")
    }
    //end of register validations

    http.post('/users', data).then(function(response){
      if(!response.data.message){
        callback(response.data.str)
      } else{

        //The code below is for setting a cookie with or without an expiration date
        if (data.remembered) {
          cookie.put('id', response.data.id)
        } else {
          var today = new Date()
          var date_to_expire = new Date(today)
          date_to_expire.setHours(today.getHours() + 2) //They'll stay logged in for 2 hours
          cookie.put('id', response.data.id, {'expires': date_to_expire})
        }

        callback('')
        location.url('/main')
      }
    })
  }


  factory.login = function(data, callback){
    if(angular.isUndefined(data)){
      return callback('All fields must be filled out')
    } else if(angular.isUndefined(data.email) || data.email.length < 1){
      return callback("Email can't be blank")
    } else if(angular.isUndefined(data.password) || data.password.length < 1){
      return callback("Password can't be blank")
    } else if(angular.isUndefined(data.remembered)){
      data.remembered = false
    } else if(data.remembered != true && data.remembered != false){
      return callback("Nice try there guy.")
    }

    http.post('/login', data).then(function(response){
      if(!response.data.message){
        callback(response.data.str)
      } else{

        //The code below is for setting a cookie with or without an expiration date
        if (data.remembered) {
          cookie.put('id', response.data.id)
        } else {
          var today = new Date()
          var date_to_expire = new Date(today)
          date_to_expire.setHours(today.getHours() + 2) //They'll stay logged in for 2 hours
          cookie.put('id', response.data.id, {'expires': date_to_expire})
        }

        callback('')
        location.url('/main')
      }
    })
  }

  //The below code should probably be moved to a different controller
  factory.logout = function(){
    http.get('/logout').then(function(response){
      cookie.remove('id')
      location.url('/')
    })
  }

  return factory;
}])



// *******************End*******************
