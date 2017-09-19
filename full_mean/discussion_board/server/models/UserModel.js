var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var UserSchema = new mongoose.Schema({
 username: {
   type: String,
   required: true,
   minlength: 4,
 },
 password:{
   type: String,
   required: true,
   minlength: 5,
 },


}, {timestampe: true});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.pre('save', function(done) {
    this.password = this.generateHash(this.password);
    done();
});

var User = mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'
