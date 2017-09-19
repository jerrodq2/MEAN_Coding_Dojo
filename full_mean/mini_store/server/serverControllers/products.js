var mongoose = require('mongoose')
var Product = mongoose.model('Product')
var Order = mongoose.model('Order')

module.exports = {
  find: function(req, res){
    Product.find({}, function(err, results){
      res.json(results)
    })
  },
  create: function(req, res){
    var product = new Product(req.body)
    product.save(function(err){
      if(err){
        console.log(err)
        res.json({message: false, str: 'Product Name is already in the database'})
      } else{
        res.json({message: true})
      }
    })
  },
  delete: function(req, res){
    //We have to delete not only this product but all orders that have to do with this product, unless given different instructions
    Product.findOne({_id: req.params.id}, function(err, product){ //so we can find it's name and search through the products with that
      Order.remove({product_name: product.name},function(err){ //so we delete any order that deals with this product
        if(err){console.log(err)}
        Product.remove({_id: req.params.id}, function(err){
          if(err){console.log(err)}
        })
      })
    })
  },

}


// *******************End*******************
