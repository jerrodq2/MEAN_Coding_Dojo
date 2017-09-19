
app.factory('userFactory', ['$http', '$routeParams', '$location','$cookies', function(http, routeP, location, cook){
  var factory ={};
  if(cook.get('id'))
    location.url('/');

  return factory;
}])
