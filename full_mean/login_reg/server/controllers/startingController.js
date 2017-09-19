var mongoose = require('mongoose');
var LoginReg = mongoose.model('LoginReg');


module.exports = {
  create: function(req, res){
    var user = new LoginReg(req.body);
    user.save(function(err)
    {
      if(err){
        res.json(err)
      } else{
        res.json({message: 'Successfully registered, please log in'})
      }
    }
  )},
  login: function(req, res){
    LoginReg.findOne({email:req.body.email}, function(err, result){
      if(err){
        res.json({message: false});
      } else if(!result){
        res.json({message: false});
      } else {
        var check = result.validPassword(req.body.password)
        if(check){
          console.log('good login');
          res.json({message: true});
        } else{
          console.log('unsuccessful login');
          res.json({message: false});
        }
      }
    })
  }
}
