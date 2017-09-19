var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
// create the schema
var LoginRegSchema = new mongoose.Schema({
 name: {
   type: String,
   required: true,
   minlength: 4,
   maxlength: 15,
 },
 email: {
   type: String,
   required: true,
 },
 password: {
   type: String,
   minlength:8,
   maxlength:255,
   required:true,
   validate: {
     validator: function( value ) {
       return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test( value );
     },
     message: "Password failed validation, you must have at least 1 number, uppercase and special character"
   }
 }
}, {timestamps: true});

LoginRegSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

LoginRegSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

LoginRegSchema.pre('save', function(done) {
    this.password = this.generateHash(this.password);
    done();
});


mongoose.model('LoginReg', LoginRegSchema); // We are setting this Schema in our Models as 'User'
