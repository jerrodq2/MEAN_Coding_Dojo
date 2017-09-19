app.controller('showControl', [ '$routeParams', '$location', 'friendsFactory', function($routeParams, $location, friendsFactory){
  this.friend = {};
  var self = this;
  friendsFactory.show($routeParams.id, function(data){
    self.friend = data;
  })
  this.delete = function(id){
    friendsFactory.delete(id);
    friendsFactory.index(function(data){
      self.friends = data;
    })
  }
  this.update = function(id){
    friendsFactory.update(id, this.user)
    $location.url('/')
  }
}])
