var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
// create the schema
//In this schema you'll see how to setup your password column to be hashed, set to the maxlength to 255, as hashes can be long. I also use the "validate" validator to make the password match a regex, but this is optional. Also, using a message with "validate" is optional, that is the error message that is sent if it doesn't match the regex, if you didn't want to include a message, you just make "validate" equal to the function, and not an object with the function within it.
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



//Below are custom model methods. For the first two, every instance or document has access to them. The last one is a method that automatically happens when you run save(), and it happens before the document is actually saved.

//Below you'll see how to hash and check a hash.
LoginRegSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    //the line above hashes a password
};

LoginRegSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
    //the line above checks if the given password matches the saved password (this.password) and returns true or false. the "this" in this method refers to the document that calls it.
};

LoginRegSchema.pre('save', function(done) {
    this.password = this.generateHash(this.password);
    done();
    //This pre method automatically runs before a document is saved whenever you run save(), this one simply changes the password to a hashed one with the method above. This method wont' finish and actually save the document until you call "done()"
});

mongoose.model('LoginReg', LoginRegSchema); // We are setting this Schema in our Models as 'User'
