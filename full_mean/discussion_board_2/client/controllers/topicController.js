app.controller('topicController', ['topicFactory', function(fact){
  var self = this
  this.topic = {}
  fact.topic(function(data){
    self.topic = data
  })
  this.addPost = function(){
    fact.addPost(this.newPost, this.topic._id, function(str){
      if(str){
        self.postFlash = str
      } else {
        self.postFlash = ''
        fact.topic(function(data){
          self.topic = data
        })
      }
    })
  }
  this.addComment = function(pid, comment){
    this.newComment = {comment: comment}
    fact.addComment(this.newComment, pid, function(str){
      if(str){
        self.commentFlash = str
      } else {
        self.commentFlash = ''
        fact.topic(function(data){
          self.topic = data
        })
      }
    })
  }
  this.like = function(pid){
    fact.like(pid, function(str){
      if(str){
        self.postFlash = str
      } else {
        self.postFlash = ''
        fact.topic(function(data){
          self.topic = data
        })
      }
    })
  }
  this.logout = function(){
    fact.logout()
  }


}])



// *******************End*******************
