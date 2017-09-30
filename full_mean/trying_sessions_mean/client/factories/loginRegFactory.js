app.factory('loginRegFactory', ['$http', '$routeParams', '$location','$cookies', function(http, routeP, location, cookie){
  var factory = {};
  if(cookie.get('id')){
    location.url('/') //the route for when you're already logged in
    //If a user has registered or logged in and hasn't logged out, then they will have a cookie with "id" as the key, and be redirected to the "/" route. However, if they didn't click the remember me box then the session and cookie will only last a minute
  } else {
    location.url('/welcome')
    //if they aren't logged in, or the session and cookie have expired, they're redirect to the login/register page. Ordinarily, the login and register page would have it's own factory and/or controller so that you would be automatically redirected to another page. And all other pages would have a separate controller/factory from the loginreg one, so that you're automatically redirected to the login page if you're not logged in.
  }

  factory.check = function(){
    //this method is just so I can see the current status of the session and cookie for understanding, it doesn't do anything for functionality.
    if (cookie.get('id')) {
      console.log("cookie id = " + cookie.get('id'));
    } else {
      console.log("no cookie");
    }
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
        //if there was an issue, I return: "{message: false, str: 'Email already in database, please log in'}"
        callback(response.data.str)
      } else{

        //The below code is to determine how long the cookie will live, if they click "remember me" when registering, the cookie won't have an expired date, but if they didn't, then we set the cookie to "expire" to be deleted after one minute, since that is the same amount of time that the server side session will live. The dates below, get/setSeconds and "expires" is explained at the bottom of the page.
        if (data.remembered) {
          cookie.put('id', response.data.id)
        } else {
          var today = new Date()
          var date_to_expire = new Date(today)
          date_to_expire.setSeconds(today.getSeconds()+60)
          cookie.put('id', response.data.id, {'expires': date_to_expire})
        }

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
      console.log("test: " + data.remembered);
      if(!response.data.message){
        callback(response.data.str)
      } else{

        //As said in the register method, the below code is explained at the bottom.
        if (data.remembered) {
          cookie.put('id', response.data.id)
        } else {
        var today = new Date()
        var date_to_expire = new Date(today)
        date_to_expire.setSeconds(today.getSeconds()+60)
        cookie.put('id', response.data.id, {'expires': date_to_expire})
        }

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

/* ************************** DETERMINING WHEN A COOKIE WILL EXPIRE ****************************
FIRST, we'll cover the date part, we start by creating a datetime variable with "var today = new Date()", if we console.log it, it looks like: Sat Sep 30 2017 10:47:26 GMT-0500 (CDT). Now, for these examples we'll be using get/setSeconds(), but there are other methods we'll touch on below. The way we determine the date to expire, is after creating the first date, we create another date, using the first one as a parameter for Date(), see below. We use the first date as a parameter so that they will be the exact same datetime, otherwise a small amount of time could be between them, which wouldn't be a big deal normally. Now that we have both date variables, we use setSeconds() to set the seconds, basically if we did: "test.setSeconds(15)", it wouldn't increase the seconds by 15, it would set the time part of the date to the 15 second mark. However, if we go over, or go over 60 seconds, then it would get added. But, we also use it in conjunction with "(today.getSeconds() + 120)", basically, this says to get today's date, grab the seconds, and add 120 seconds to it, and use that to set the seconds for the test variable. So, when we first set "test" it would look like this: "Sat Sep 30 2017 11:14:21 GMT-0500 (CDT)" but after adding 120 seconds (2 minutes) with the below code, it looks like: "Sat Sep 30 2017 11:16:21 GMT-0500 (CDT)", exaclty 2 minutes later. Once we determine the date we want to the cookie to expire on, when we assign/create the cookie with "$cookies.put()", we add the optiona parameter "{'expires': }", and set expires to the expiration date, 'test' in this case. After doing this, the cookie will die, or disappear after 2 minutes have passed. The other date methods we can use are detailed below, after the example code:

var today = new Date()
var test = new Date(today)
test.setSeconds(today.getSeconds() + 120)
cookie.put('id', value..., {'expires': test})


*************** OTHER DATE METHODS WE CAN USE ***************
We can use the setSeconds and getSeconds combo to set the cookie to die after so many seconds, but for larger amounts, it's better to use a more appropriate method, some examples are listed below. All the relevant info and methos are located here: https://www.w3schools.com/jsref/jsref_obj_date.asp

To set the time to expire to 2 minutes ahead via seconds:
var today = new Date()
var test = new Date(today)
test.setSeconds(today.getSeconds() + 120)

To set the time to expire to 2 minutes ahead via minutes:
var today = new Date()
var test = new Date(today)
test.setMinutes(today.getMinutes() + 2)

To set the time to expire to 2 hours ahead:
var today = new Date()
var test = new Date(today)
test.setHours(today.getHours() + 2)

To set the time to expire to 2 months ahead:
var today = new Date()
var test = new Date(today)
test.setMonth(today.getMonth() + 120)
*/

// *******************End*******************
