
app.controller('friendsControl', [ '$routeParams', '$location', 'friendsFactory', function($routeParams, $location, friendsFactory){
  this.friends = [];
  var self = this;
  friendsFactory.index(function(data){
    self.friends = data;
  })

  this.create = function(){
    friendsFactory.create(this.newFriend);
    $location.url('/')
  }
  this.delete = function(id){
    friendsFactory.delete(id);
    friendsFactory.index(function(data){
      self.friends = data;
    })
  }
  
}])
