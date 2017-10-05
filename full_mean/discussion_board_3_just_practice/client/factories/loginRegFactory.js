app.factory('loginRegFactory', ['$http', '$routeParams', '$location','$cookies', function(http, routeP, location, cookie){
  var factory = {};

  if(cookie.get('discussion_board_3_id')){
    console.log(cookie.get('discussion_board_3_id'));
    location.url('/main')
  }

  factory.register = function(data, callback){
    //start of register validations
    if(angular.isUndefined(data)){
      return callback('All fields must be filled out.')
    } else if(angular.isUndefined(data.username) || data.username.length < 2){
      return callback("Username can't be blank")
    } else if(angular.isUndefined(data.email) || data.email.length < 1){
      return callback("Email can't be blank")
    } else if(angular.isUndefined(data.password)){
      return callback("Password can't be blank")
    } else if(angular.isUndefined(data.confirm)){
      return callback("Confirmation Password can't be blank")
    } else if(data.password.length < 4){
      return callback('Password must be at least 4 characters long')
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
          cookie.put('discussion_board_3_id', response.data.id)
          cookie.put('discussion_board_3_username', response.data.username)
        } else {
          var today = new Date()
          var date_to_expire = new Date(today)
          date_to_expire.setHours(today.getHours() + 2) //They'll stay logged in for 2 hours
          cookie.put('discussion_board_3_id', response.data.id, {'expires': date_to_expire})
          cookie.put('discussion_board_3_username', response.data.username, {'expires': date_to_expire})
        }
        callback('')
        location.url('/main')
      }
    })
  }


  factory.login = function(data, callback){
    if(angular.isUndefined(data)){
      return callback('All fields must be filled out')
    } else if(angular.isUndefined(data.username) || data.username.length < 1){
      return callback("Username can't be blank")
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
          cookie.put('discussion_board_3_id', response.data.id)
        } else {
          var today = new Date()
          var date_to_expire = new Date(today)
          date_to_expire.setHours(today.getHours() + 2) //They'll stay logged in for 2 hours
          cookie.put('discussion_board_3_id', response.data.id, {'expires': date_to_expire})
        }

        callback('')
        location.url('/main')
      }
    })
  }



  return factory;
}])



// *******************End*******************
