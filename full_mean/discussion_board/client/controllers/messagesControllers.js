app.controller('mainController',  ['messagesFactory', '$location', '$cookies', function(mf, location, cook){
  var self = this;
  this.name = cook.get('username');
  this.flash = '';
  this.topics = [];
  this.createTopic = function(){
    mf.createTopic(this.newTopic, function(response){
      if(!response){
        self.flash ='Topic must be at least 4 characters long and the Description must be at least 10 characters long'
      } else{
        mf.findAll(function(data){
          self.topics = data;
          self.newTopic={};
        })
      }
    })
  }
  mf.findAll(function(data){
    self.topics = data;
  })
  this.logout = function(){
    mf.logout();
  }

}])


app.controller('topicController', ['messagesFactory', function(mf){
  var self = this;
  this.topic = {};
  mf.findOne(function(data){
    self.topic = data;
  })
  this.addMessage = function(){
    mf.addMessage(this.message, this.topic._id, function(response){
      if(!response.message){
        self.flashM = 'Message must be at least 10 characters long';
      } else {
        mf.findOne(function(data){
          self.topic = data;
          self.flashM = '';
          self.message = '';
        })
      }
    })
  }
  this.addComment = function(mid, comment){
    mf.addComment(mid, comment, function(response){
      if(!response.message){
        self.flashC='Comment must be at least 10 characters long'
      } else {
        mf.findOne(function(data){
          self.topic = data;
          self.flashC = '';
        })
      }
    })
  }
}])
