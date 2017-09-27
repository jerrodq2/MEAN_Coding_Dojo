var mongoose = require('mongoose');
var LoginReg = mongoose.model('LoginReg');

//Below, you'll see examples of how you send json data back to the via response.json, or "res.json", since I pass "res" in for the second parameter of the functions, which represents the server's response. "req" is the client request.

module.exports = {
  create: function(req, res){
    var user = new LoginReg(req.body);
    user.save(function(err)
    {
      if(err){
        res.json(err)
        // "res.json()" or "response.json()", whatever your second parameter is for the inital function, is how we send json data back to the client. That data passed to .json() must be in json format or as a javascript object, as shown below.
      } else{
        res.json({message: 'Successfully registered, please log in'})
      }
    }
  )},
  login: function(req, res){
    LoginReg.findOne({email:req.body.email}, function(err, result){
      if(err){
        res.json({message: false}); // we could change this to send error messages, for example: res.json({user: '', error: "There was an error.."})
      } else if(!result){
        res.json({message: false});
      } else {
        var check = result.validPassword(req.body.password)
        if(check){
          console.log('good login');
          res.json({message: true}); //this would be different in full mean, we would most likely send the user data
        } else{
          console.log('unsuccessful login');
          res.json({message: false});
        }
      }
    })
  }
}
