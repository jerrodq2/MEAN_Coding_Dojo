
app.factory('bidFactory', ['$http', '$routeParams', '$location','$cookies', function(http, routeP, location, cookie){
  var factory ={};
  factory.find = function(callback){
    http.get('/find').then(function(response){
      var bids = response.data
      var bids1 = [], bids2 = [], bids3 = []
      for (var i = 0; i < bids.length; i++){ //this is for convenience, separating the bids into arrays for each product
        if(bids[i].product == "product1"){
          bids1.push(bids[i])
        } else if(bids[i].product == "product2"){
          bids2.push(bids[i])
        } else if(bids[i].product == "product3"){
          bids3.push(bids[i])
        }
      } //end for loop
      callback(bids1, bids2, bids3)
    })
  }
  factory.bid = function(prod, amount, callback){
    if(angular.isUndefined(amount)){
      return callback(false, "Bid can't be 0")
    } if(amount == 0){
      return callback(false, "Bid can't be 0")
    }
    var data ={product: prod, amount: amount, username: cookie.get('username')}
    http.post('/bid', data).then(function(response){
      if(!response.data.message){
        callback(false, response.data.str)
      } else{ //tedious be the asyncronous is being troublesome so we have to go through the process of updating bids 1-3 again
        var bids = response.data.bids
        var bids1 = [], bids2 = [], bids3 = []
        for (var i = 0; i < bids.length; i++){ //this is for convenience, separating the bids into arrays for each product
          if(bids[i].product == "product1"){
            bids1.push(bids[i])
          } else if(bids[i].product == "product2"){
            bids2.push(bids[i])
          } else if(bids[i].product == "product3"){
            bids3.push(bids[i])
          }
        } //end for loop
        callback(true, {bids1: bids1, bids2: bids2, bids3: bids3})

      }
    })
  }
  factory.endBid = function(callback){
    http.get('/find').then(function(response){
      var bids = response.data
      var prod1 = false, prod2 = false, prod3 = false // i'm going to use these variables to make sure that all products have at least one bid
      for(var i = 0; i < bids.length; i++){
        if(bids[i].product == "product1"){
          prod1 = true
        } else if(bids[i].product == "product2"){
          prod2 = true
        } else if(bids[i].product == "product3"){
          prod3 = true
        }
      }
      if(!prod1 || !prod2 || !prod3){ //then at least one product doesn't have a bid
        return callback("Cannot end the bid, One or more product(s) does not have a bid yet")
      } // we get this far then all products have at least 1 bid on them
      location.url('/result') //send user to result page
    })
  }

  factory.logout = function(){
    cookie.remove('id')
    cookie.remove('username')
    location.url('/loginReg')
  }
  factory.reset = function(callback){
    http.get('/reset').then(function(response){
      callback()
      location.url('/bids')
    })
  }
  return factory;
}])




// *******************End*******************
