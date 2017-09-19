

var Customers = require('../serverControllers/customers.js')
var Orders = require('../serverControllers/orders.js')
var Products = require('../serverControllers/products.js')

module.exports = function(app){
  app.get('/find/products', Products.find)
  app.post('/create/product', Products.create)
  app.get('/delete/product/:id', Products.delete)

  app.get('/find/customers', Customers.find)
  app.post('/create/customer', Customers.create)
  app.get('/delete/customer/:id', Customers.delete)

  app.get('/find/orders', Orders.find)
  app.post('/create/order', Orders.create)
  app.get('/delete/order/:id', Orders.delete)
  app.post('/update/order/:id', Orders.update)
  app.get('/findOne/:id', Orders.findOne)
}

// *******************End*******************
