var mongoose = require('mongoose')

var CustomerSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    minlength: 4,
    unique: true,
  },
}, {timestamps: true})


var ProductSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    minlength: 4,
    unique: true,
  },
  description:{
    type: String,
    required: true,
    minlength: 10,
    maxlength: 100,
  },
  imgUrl:{
    type: String,
    required: true,
    minlength: 10,
  },
  initial_quantity:{
    type: Number,
    required: true,
  },
  current_quantity:{
    type: Number,
    required: true,
  },
}, {timestamps: true})


var OrderSchema = new mongoose.Schema({
  customer_name:{
    type: String,
    required: true,
    minlength: 4,
  },
  product_name:{
    type: String,
    required: true,
    minlength: 4,
  },
  quantity:{
    type: Number,
    required: true,
  },
}, {timestamps: true})

mongoose.model('Customer', CustomerSchema)
mongoose.model('Product', ProductSchema)
mongoose.model('Order', OrderSchema)


// *******************End*******************
