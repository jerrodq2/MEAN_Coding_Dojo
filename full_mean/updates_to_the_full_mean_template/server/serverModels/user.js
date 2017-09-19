var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var UserSchema = new mongoose.Schema({
 first_name: {
   type: String,
   required: true,
 },
 last_name:{
   type: String,
   required: true,
 },
 email: {
   type: String,
   unique: true,
   required: true
 },
 password:{
   type: String,
   required: true,
   minlength: 8,
   maxlength: 20,
  //  Example of validation/regex requirements below
  //  validate: {
  //   validator: function( value ) {
  //     return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test( value )
  //   },
  //   message: "Password failed validation, you must have at least 1 number, uppercase and special character"
  //  }
 },


}, {timestamps: true})

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
}

UserSchema.pre('save', function(done) {
    this.password = this.generateHash(this.password)
    done()
})

mongoose.model('User', UserSchema)



// *******************End*******************
