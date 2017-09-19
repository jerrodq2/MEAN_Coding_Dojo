app.factory('appointmentFactory', ['$location', '$http', '$routeParams', '$cookies', function(location, http, routeP, cook){
  var factory = {};
  if(!cook.get('id') || !cook.get('name'))
    location.url('/welcome');
  factory.logout = function(){
    cook.remove('id');
    cook.remove('name');
  }
  factory.show = function(callback){
    http.get('/appointments').then(function(response){
      var data = response.data;
      for(var i =0; i < data.length; i++){
        if(data[i].userId == cook.get('id')){
          data[i].canDelete = true;
        }
      }
      callback(data);
    })
  }
  factory.create = function(data, callback){
    if(angular.isUndefined(data)){
      callback('All fields must be completed');
    } else if(angular.isUndefined(data.date)){
      callback('A date must selected');
    } else if(angular.isUndefined(data.time)){
      callback('A Time must be selected');
    } else if(angular.isUndefined(data.complain)){
      callback('Complaint cannot be empyt')
    } else {
      data.userId = cook.get('id');
      data.patient_name = cook.get('name');
      http.post('/appointment/create', data).then(function(response){
        if(!response.data.message && !response.data.str){
          callback('Complaint must be at least 10 characters long, and no longer than 20 characters');
        } else if(response.data.str){
          callback(response.data.str)
        } else{
          callback('');
          location.url('/')
        }
      })
    }
  }
  factory.delete = function(aid, callback){
    var send = {appId: aid, userId: cook.get('id')}
    http.post('/delete', send).then(function(response){
      callback(response.data.message);
    })
  }
  factory.editOne = function(callback){
    http.get('/appointments/edit/'+ routeP.id ).then(function(response){
      callback(response.data);
    })
  }
  factory.update = function(aid, data, callback){
    if(angular.isUndefined(data)){
      callback('All fields must be completed');
    } else if(angular.isUndefined(data.date)){
      callback('A date must selected');
    } else if(angular.isUndefined(data.time)){
      callback('A Time must be selected');
    } else if(angular.isUndefined(data.complain)){
      callback('Complaint cannot be empyt')
    } else {
      data.check = cook.get('id');
      data.aid = aid;
      http.post('/update', data).then(function(response){
        if(response.data.message){
          callback('')
          location.url('/');
        } else{
          callback('Complaint must be at least 10 characters long, and no longer than 20 characters')
        }
      })
    }
  }
  return factory;
}])
