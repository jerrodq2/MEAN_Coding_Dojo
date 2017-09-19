app.controller('userController', ['$routeParams', '$location', '$cookies','userFactory', function(rparam, location, cook, uf){
  var self = this;
  this.flash = ''
  if(cook.get('id')){
    location.url('/board')
  }
  this.register = function(){
    uf.register(this.user, function(response){
      if(!response.message){
        console.log(response)
        self.flash='Username/email already exists in user or incorrect password, please try again or log in'
      } else{
        cook.put('id', response.id);
        cook.put('username', response.username);
        this.flash = '';
        location.url('/board');
      }
    })
  }
  this.secondFlash=''
  this.login = function(){
    uf.login(this.checkUser, function(response){
      if(!response.message){
        self.secondFlash='Username or password is incorrect please try again'
      } else{
        cook.put('id', response.id);
        cook.put('username', response.username);
        self.secondFlash = '';
        location.url('/board');
      }
    })
  }
}])
