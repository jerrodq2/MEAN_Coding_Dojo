var mongoose = require('mongoose')
var Order = mongoose.model('Order')
var Product = mongoose.model('Product')

module.exports = {
  find: function(req, res){
    Order.find({}, function(err, results){
      res.json(results)
    })
  },
  create: function(req, res){
    Product.findOne({name: req.body.product_name}, function(err, product){
      //Incase they try to ask for more than what is left in stock/databse
      if(product.current_quantity < req.body.quantity){
        return res.json({message: false, str: 'There is not enough of this product to fulfill the order, there is only '+product.current_quantity+' left in stock'})
      } else{
        var order = new Order(req.body)
        order.save(function(err){
          if(err){
            console.log(err)
            res.json({message: false, str: 'There was an error, please try again'})
          } else{
            //Have to update the product as well
            product.current_quantity = product.current_quantity - req.body.quantity
            product.save(function(err){
              if(err){
                console.log('uh oh there was an err - '+err)
                res.json({message: false, str: 'order created but product quantity was not updated'})
              } else{
                res.json({message: true})
              }
            })
          }
        })
      }
    })
  },


  delete: function(req, res){
    Order.findOne({_id: req.params.id}, function(err, order){
      //first, i'll update the product related to it so that the quantity is returned
      Product.findOne({name: order.product_name}, function(err, product){
        product.current_quantity = product.current_quantity + order.quantity
        product.save(function(err){
          if(err){console.log(err)}
          //then I'll actually remove the product
          Order.remove({_id: req.params.id}, function(err){
            if(err){console.log(err)}
            Order.find({}, function(err, results){
              res.json(results)
            })
          })
        })
      })
    })
  },


  update: function(req, res){
    Order.findOne({_id: req.params.id}, function(err, order){
      // I have to act and update the product differently based on if the quantity they asked for went up or down
      if(order.quantity >= req.body.quantity){
        //Then the amount of said product they want decreased so we have to add the difference back to the product, or it stayed the same, in which case, this won't hurt anything
        var temp = order.quantity - req.body.quantity
        Order.update({_id: req.params.id}, {$set: req.body}, function(err){
          if(err){
            return console.log(err)
          }
          Product.findOne({name: order.product_name}, function(err, product){
            product.current_quantity = product.current_quantity + temp
            product.save(function(err){
              if(err){console.log(err)}
            })
          })
        })
      }

      else{
        //the amoung they want increase and we have to make sure that there is enough of the product in stock to do this.
        var temp = req.body.quantity - order. quantity //this temp is what will be subtracted from the product, have to make sure there is enough of the product to do that first though
        Product.findOne({name: order.product_name}, function(err, product){
          if(product.current_quantity < temp){
            return res.json({message: false, str: 'There is not enough of this product to fulfill the order, there is only '+product.current_quantity+' left in stock'})
          } else{
            //no point updating the product though if updating the order gives us an error though
            Order.update({_id: req.params.id}, {$set: req.body}, function(err){
              if(err){
                return console.log(err)
              } else{
                product.current_quantity = product.current_quantity - temp
                product.save(function(err){
                  if(err){
                    console.log(err)
                  } else{
                    return res.json({message: true})
                    //If we got to here then everything went off without a hitch
                  }
                })
              }
            })
          }
        })
      }
    })
  },


  
  findOne: function(req, res){
    Order.findOne({_id: req.params.id}, function(err, result){
      return res.json(result)
    })
  },

}


// *******************End*******************
