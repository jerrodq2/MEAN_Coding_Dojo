var mongoose = require('mongoose')
var Customer = mongoose.model('Customer')

module.exports = {
  find: function(req, res){
    Customer.find({}, function(err, results){
      res.json(results)
    })
  },
  create: function(req, res){
    var customer = new Customer(req.body)
    customer.save(function(err){
      if(err){
        res.json({message: false, str: 'That name is already in the database'})
      } else{
        res.json({message: true})
      }
    })
  },
  delete: function(req, res){
    //i'm not going to delete any orders with that, assuming the client just doesn't want to associate any more orders with this customer
    Customer.remove({_id: req.params.id}, function(err){
      if(err){
        console.log(err)
      }
      res.json({message: true})
    })
  },



}



// *******************End*******************
