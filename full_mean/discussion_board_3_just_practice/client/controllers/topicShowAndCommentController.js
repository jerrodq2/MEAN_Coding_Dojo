app.controller('topicShowAndCommentController', ['topicFactory', '$location', function(fact, location){
  var self = this;

  fact.findOne(function(data){
    self.topic = data
  })

  this.logout = function(){
    fact.logout()
  }

  this.create_comment = function(){
    fact.create_comment(this.new_comment, function(message, response){
      if(!message){
        self.comment_flash = response
      } else {
        self.comment_flash = ''
        self.topic = response
      }
    })
  }


  this.like = function(id){
    fact.like(id, function(response){
      self.topic = response
    })
  }


}])



// *******************End*******************
