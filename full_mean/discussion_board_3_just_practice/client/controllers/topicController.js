app.controller('topicController', ['topicFactory', '$location', '$cookies', function(topic, location, cookie){
  var self = this;
  this.main_flash = ''
  this.username = cookie.get('discussion_board_3_username')
  this.id = cookie.get('discussion_board_3_id')

  this.logout = function(){
    topic.logout()
  }

  topic.find_topics(function(data){
    self.topics = data
  })

  this.create_topic = function(){
    topic.create_topic(this.new_topic, function(response){
      self.main_flash = response
    })
  }



}])



// *******************End*******************
