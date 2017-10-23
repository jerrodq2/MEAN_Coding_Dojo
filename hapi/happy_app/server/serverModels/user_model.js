var mongoose = require('mongoose'),
    Schema = mongoose.Schema; //used in associations when specifying the type


var UserSchema = new mongoose.Schema({
 first: {
   type: String,
   required: true,
 },
 last: {
   type: String,
   required: true
 },


}, {timestamps: true})


mongoose.model('User', UserSchema)



// *******************End*******************
