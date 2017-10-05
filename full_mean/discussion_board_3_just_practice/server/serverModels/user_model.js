var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var Schema = mongoose.Schema; //used in associations when specifying the type


var UserSchema = new mongoose.Schema({
 username: {
   type: String,
   required: true,
   unique: true,
   minlength: 2
 },
 email: {
   type: String,
   unique: true,
   required: true
 },
 password:{
   type: String,
   required: true,
   minlength: 4,
 },
 comments: [{
   type: Schema.Types.ObjectId,
   ref: 'Comment'
 }]


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
