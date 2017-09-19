var mongoose = require('mongoose');
var AppointSchema = new mongoose.Schema({
  patient_name:{
    required: true,
    type: String,
  },
  userId:{
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  time:{
    required: true,
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  complain:{
    type: String,
    required: true,
    minlength: 10,
    maxlength: 40,
  }


}, {timestamp: true});

var Appointment = mongoose.model('Appointment', AppointSchema);
