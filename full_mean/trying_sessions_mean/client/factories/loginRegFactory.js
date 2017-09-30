app.factory('loginRegFactory', ['$http', '$routeParams', '$location','$cookies', function(http, routeP, location, cookie){
  var factory = {};
  if(cookie.get('id')){
    console.log(cookie.get('id'));
    location.url('/')
    //If a user has registered or logged in but hasn't logged out, then they will have a cookie with "id" as the key, and be redirected to the "/" route
  }
  factory.check = function(){
    //this method is just so I can see the current status of the session for understanding, it doesn't do anything for functionality.
    http.get('/check').then(function(response){
      console.log('start check');
      console.log(response.data);
      console.log('end check');
    })
  }
  factory.register = function(data, callback){
    // Validations for convenience of the user, this way I don't have to go all the way back to the server in order to tell them there's something wrong. Also, a good way to make sure that all the validations you have in th model is fulfilled. It's important to understand how the data (or form object) works or what format it takes according to the user action.

    //********************************UNDERSTANDING THE FORM DATA********************************
    //If they fill everything out, it looks like this: "{first_name: "Jerrod", last_name: "Quintana", email: "j@j.com", password: "dddddddd", confirm: "dddddddd"}", but if they don't even type a single character in any of the input fields, the object is never created, so it is undefined. I don't create an empty object in the controller (this.reg = {}), if I did, then it would never register as undefined, just empty. But since I tied "this.reg" or the controller key/object "reg" to the view inputs via ng-model, it is created as soon as they type anything. Even if they type "a" in a field and then delete it, the object was still created and will exist until they reload the page, which would go back to the default of it not exisiting. For example, if I type just "a" in the first name column, it looks like: "{first_name: "a"}", but if I immediately deleted the "a", it would look like: {first_name: ""}, even though I deleted the value/content, the key was still created, and will exist until they reload the page. In summary, with my current setup, the ojbect is created as soon as they type anything, and each key is created if they type anything for that input, even if they delete everything and send it over empty, the keys will still exist and look like: "{first_name: "", last_name: "", email: "", password: "", confirm: ""} "
    console.log("The data you submitted for registration is below: ");
    console.log(data);
    if(angular.isUndefined(data)){
      return callback('All fields must be filled out.')
      // "angular.isUndefined" is a method speficially for angular to check it's undefined. If they submit the form without typing anything, the object will be undefined, this checks that.
    } else if(angular.isUndefined(data.first_name) || data.first_name.length < 1){
      return callback("First Name can't be blank.")
      //I check two things here, first if the key "first_name" is undefined. If they never type in that input field, it won't exist, this checks that. Second, if the key is blank. If they type in it, they key will be created, but if they delete what they type and submit the form with an empty input, the key will still exist, just be blank, like so: {first_name: ""}, once they key is created, it will exist until they reload the page. So, we make sure that they key "first_name" exists, and isn't blank. It's important that we check if it exists, otherwise we could get an error for trying to mesure the length of undefined.
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
    // End of validations
    http.post('/register', data).then(function(response){
      if(!response.data.message){
        callback(response.data.str)
      } else{
        cookie.put('id', response.data.id)
        callback('') //this is to reset the flash message used in the view.
        location.url('/') //redirects to that route
      }
    })
  }






  factory.login = function(data, callback){
    // Validations for convenience of the user
    console.log("The data you submitted for logging in is below: ");
    console.log(data);
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
    // End of validations
    http.post('/login', data).then(function(response){
      if(!response.data.message){
        callback(response.data.str)
      } else{
        cookie.put('id', response.data.id)
        callback('')
        location.url('/')
      }
    })
  }




  factory.logout = function(){
    http.get('/logout').then(function(response){
      cookie.remove('id')
      console.log('logged out')
      location.url('/welcome')
    })
  }


  return factory;
}])



// *******************End*******************
