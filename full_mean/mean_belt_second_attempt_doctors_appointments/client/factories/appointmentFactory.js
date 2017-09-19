
app.factory('appointmentFactory', ['$http', '$routeParams', '$location','$cookies', function(http, routeP, location, cookie){
  var factory ={};
  if(!cookie.get('id'))
    location.url('/welcome')

  factory.find = function(callback){
    http.get('/findAll').then(function(response){
      callback(response.data, cookie.get('id'))
    })
  }
  factory.findOne = function(callback){
    http.get('/findOne/'+routeP.id).then(function(response){
      callback(response.data)
    })
  }
  factory.create = function(data, callback){
    if(angular.isUndefined(data)){
      return callback('All fields must be filled out')
    } else if(angular.isUndefined(data.date)){
      return callback('Date must be selected')
    } else if(angular.isUndefined(data.time)){
      return callback('A time must be selected')
    } else if(angular.isUndefined(data.complain) || data.complain.length < 1){
      return callback("The complain can't be empty")
    } else if(data.complain.length < 10){
      return callback('Complaint must be at least 10 characters')
    } else if(data.complain.length > 50){
      return callback("Complaint can't be more than 50 characters")
    }
    data.userId = cookie.get('id')
    data.patient_name = cookie.get('name')
    http.post('/create', data).then(function(response){
      if(!response.data.message){
        callback(response.data.str)
      } else{
        callback('')
        location.url('/main')
      }
    })
  }
  factory.update = function(data, aid, callback){
    if(angular.isUndefined(data)){
      return callback('All fields must be filled out')
    } else if(angular.isUndefined(data.date)){
      return callback('Date must be selected')
    } else if(angular.isUndefined(data.time)){
      return callback('A time must be selected')
    } else if(angular.isUndefined(data.complain) || data.complain.length < 1){
      return callback("The complain can't be empty")
    } else if(data.complain.length < 10){
      return callback('Complaint must be at least 10 characters')
    } else if(data.complain.length > 50){
      return callback("Complaint can't be more than 50 characters")
    }
    data.checkId = cookie.get('id')
    data.aid = aid
    http.post('/update', data).then(function(response){
      if(!response.data.message){
        callback(response.data.str)
      } else{
        callback('')
        location.url('/main')
      }
    })
  }
  factory.delete = function(aid){
    http.get('/destroy/'+aid+'/'+cookie.get('id'))
  }
  factory.logout = function(){
    cookie.remove('id')
    cookie.remove('name')
    location.url('/welcome')
  }
  return factory;
}])




// *******************End*******************
