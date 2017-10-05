app.controller('topicController', ['topicFactory', '$location', '$cookies', function(topic, location, cookies){
  var self = this;
  this.main_flash = ''
  this.username = cookies.get('discussion_board_3_username')
  this.id = cookies.get('discussion_board_3_id')

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


  this.delete = function(id){
    topic.delete(id, function(response){
      self.topics = response
    })
  }





}])



// *******************End*******************
