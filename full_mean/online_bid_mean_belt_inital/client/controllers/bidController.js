app.controller('bidController', ['bidFactory', '$cookies', function(fact, cookie){
  var self = this;
  this.bids1 = []
  this.bids2 = []
  this.bids3 = []
  this.username = cookie.get('username')
  fact.find(function(data1, data2, data3){
    self.bids1 = data1
    self.bids2 = data2
    self.bids3 = data3
  })
  this.logout = function(){
    fact.logout()
  }
  this.bid = function(prod, amount){
    fact.bid(prod, amount, function(message, data){
      if(!message){
        self.flash = data
      } else{ //to update the bids on the page
        self.bids1 = data.bids1
        self.bids2 = data.bids2
        self.bids3 = data.bids3
      }
    })
  }
  this.endBid = function(){
    fact.endBid(function(str){
      self.endFlash = str
    })
  }
  this.reset = function(){
    fact.reset(function(){ //with the separating all the bids into three arrays, simplist thing to do for what is displayed on the page is as follows
      this.bids1 = []
      this.bids2 = []
      this.bids3 = []
    })
  }

}])



// *******************End*******************
