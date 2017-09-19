app.controller('messageController', ['$location', '$cookies','messageFactory', function(location, cook, mf){
  var self = this;
  this.flash = '';
  if(!cook.get('id')){
    location.url('/');
  }
  this.messages = [];
  mf.show(function(data){
    self.messages = data;
  })
  this.logout= function(){
    cook.remove('id');
  }
  this.create = function(){
    // if(this.newM.hasOwnProperty('username')){
    //   this.flash = 'Message has to be at least 10 characters long'
    // }
    this.newM.username = cook.get('username')
    mf.create(this.newM, function(response){
      if(!response.message){
        self.flash = 'Message has to be at least 10 characters long'
      } else{
        self.newM = {};
        mf.show(function(data){
          self.messages = data;
        })
      }
    })
  }
  this.add = function(id, comment){
    console.log(id);
    this.newC = {mid: id, comment: comment}
    this.newC.username = cook.get('username')
    mf.add(this.newC, function(response){
      if(!response.message){
        self.flash = 'Comment has to be at least 10 characters long';
      } else{
        self.newC = {};
        mf.show(function(data){
          self.messages = data;
        })
      }
    })
  }

}])
