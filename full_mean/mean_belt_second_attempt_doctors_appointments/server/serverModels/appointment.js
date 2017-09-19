var mongoose = require('mongoose')

var AppointmentSchema = new mongoose.Schema({
  patient_name:{
    type: String,
    required: true,
    minlength: 4,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  complain: {
    type: String,
    minlength: 10,
    maxlength: 50,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
}, {timestamps: true})

mongoose.model('Appointment', AppointmentSchema)

// *******************End*******************
