var mongoose = require('mongoose')
var Bid = mongoose.model('Bid')

module.exports = {
  bid: function(req, res){
    Bid.find({product: req.body.product}, function(err, bids){
      var check = true
      if(bids.length != 0){ // if the list is empty, no one has bid so there's no point in checking if the attempted bid is the highest
        var max = bids[bids.length -1].amount //if my valdiations are good, then each bid will be higher than the last one, so the last bid in the find will be the highest, or the list is empty and no one has bid yet.
        if(req.body.amount > max != true){
          check = false
        }
      } //end of the first if
      if(check){ //then the no one has bid or the attempted bid is higher than all previous so it is a correct bid
        var bid = new Bid(req.body)
        bid.save(function(err){
          if(err){
            console.log(err)
            res.json({message: false, str: "Bid can't be 0"})
          } else{
            Bid.find({}, function(err, results){
              res.json({message: true, bids: results})
            })
          }
        })
      } else{ //Then the bid they tried to enter is less than the current highest bid and shouldn't be entered
        res.json({message: false, str: 'Bid amount should be higher than the previous bid'})
      }
    })
  },
  find: function(req, res){
    Bid.find({}, function(err, bids){
      res.json(bids)
    })
  },
  reset: function(req, res){
    Bid.remove({}, function(err){
      if(err){console.log(err)}
      res.json({message: true})
    })
  }

}



// *******************End*******************
