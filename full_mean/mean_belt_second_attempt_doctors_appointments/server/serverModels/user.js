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
