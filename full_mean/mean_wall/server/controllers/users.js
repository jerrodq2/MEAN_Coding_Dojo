var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {
  register: function(req, res){
    var user = new User(req.body);
    user.save(function(err){
      if(err){
        console.log("*******");
        console.log(err);
        res.json({message: false});
      } else{
        res.json({message: true, id: user._id, username: user.username});
      }
    })
  },
  login: function(req, res){
    User.findOne({username:req.body.username}, function(err, result){
      if(err){
        res.json({message: false});
      } else if(!result){
        res.json({message: false});
      } else {
        var check = result.validPassword(req.body.password)
        if(check){
          console.log('good login');
          res.json({message: true, id: result._id, username: result.username});
        } else{
          console.log('unsuccessful login');
          res.json({message: false});
        }
      }
    })
  }
}
