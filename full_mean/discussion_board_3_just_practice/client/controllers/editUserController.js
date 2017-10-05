app.controller('editUserController', ['editUserFactory', '$location', '$cookies', function(fact, location, cookies){
  var self = this;
  this.username = cookies.get("discussion_board_3_username")

  this.logout = function(){
    fact.logout()
  }


  fact.findOne(function(message, response){
    if(!message){
      self.edit_flash = response
    } else{
      self.user = response
    }
  })

  this.edit_user = function(){
    fact.edit_user(this.user, function(response){
      self.edit_flash = response
    })
  }

  this.edit_pass = function(){
    fact.edit_pass(this.change_pass, function(response){
      self.pass_flash = response
    })
  }


}])



// *******************End*******************
