var mongoose = require('mongoose')

var BidSchema = new mongoose.Schema({
  username:{
    type: String,
    required: true,
  },
  amount:{
    type: Number,
    required: true,
  },
  product:{
    type: String,
    required: true
  },
}, {timestamps: true})

mongoose.model('Bid', BidSchema)


// *******************End*******************
