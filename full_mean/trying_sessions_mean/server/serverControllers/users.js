var mongoose = require('mongoose')
var User = mongoose.model('User')

module.exports = {
  check: function(req, res){
    res.json(req.session.user)
  },
  register: function(req, res){
    var user = new User(req.body)
    user.save(function(err){
      if(err){
        console.log('Failed to register')
        res.json({message: false, str: 'Email already in database, please log in'})
      } else{
        req.session.user = req.body
        console.log(req.session.user);
        console.log(req.session.user.first_name);
        req.session.id = user._id
        console.log(req.session.id);
        console.log('Successfully registered')
        res.json({message: true, id: user._id})
      }
    })
  },
  login: function(req, res){
    User.findOne({email:req.body.email}, function(err, result){
      if(err){
        console.log('unsuccessful login, incorrect email')
        res.json({message: false, str: 'Email is incorrect'})
      } else if(!result){
        console.log('unsuccessful login, incorrect email')
        res.json({message: false, str: 'Email is incorrect'})
      } else {
        var check = result.validPassword(req.body.password)
        if(check){
          req.session.user = result
          console.log(req.session.user);
          session.other = result
          res.json({message: true, str: 'eh'})
        } else{
          console.log('unsuccessful login, incorrect password')
          res.json({message: false, str: 'Password is incorrect'})
        }
      }
    })
  },
  logout: function(req, res){
    req.session.destroy()
  },



}



// *******************End*******************
