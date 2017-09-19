app.factory('loginRegFactory', ['$http', '$location','$cookies', function(http, location, cook){
  var factory = {};
  if(cook.get('id')){
    location.url('/')
  }
  factory.register = function(data, callback){
    // The below checks are more for user convenience, even if they tampered with these and deleted them, they still wouldn't be saved into the db
    if(angular.isUndefined(data)){
      callback('You must fill out all fields');
    } else if(angular.isUndefined(data.first_name)){
      console.log('hey');
      callback('First name cannot be blank');
    } else if(angular.isUndefined(data.last_name)){
      callback('Last name cannot be blank');
    } else if(angular.isUndefined(data.email)){
      callback('Email cannot be blank');
    } else if(angular.isUndefined(data.password)){
      callback('Password cannot be blank');
    } else if(angular.isUndefined(data.confirm)){
      callback('Confirmation Password cannot be blank')
    } else if(data.password !== data.confirm){
      callback('Password and Confirmation Password must match')
    } else {
      http.post('/register', data).then(function(response){
        if(!response.data.message){
          callback('User already exists in the database')
          // overall error message, still not too good at translating mongo errors into the appropriate messages
        } else{
          cook.put('id', response.data.id)
          var full = response.data.first_name + ' ' + response.data.last_name;
          cook.put('name', full)
          callback('');
          location.url('/')
        }
      })
    }
  }
  factory.login = function(data, callback){
    if(angular.isUndefined(data)){
      callback('All fields must be filled out');
    } else if(angular.isUndefined(data.email)){
      callback('Email cannot be blank');
    } else if(angular.isUndefined(data.password)){
      callback('Password cannot be blank');
    } else {http.post('/login', data).then(function(response){
      if(!response.data.message){
        callback('Incorrect Email or Password')
      } else{
        cook.put('id', response.data.id)
        var full = response.data.first_name + ' ' + response.data.last_name;
        cook.put('name', full)
        callback('');
        location.url('/')
      }
    })}
  }
  return factory;
}])
