var mongoose = require('mongoose')
var User = mongoose.model('User')

module.exports = {
  register: function(req, res){
    var user = new User(req.body)
    user.save(function(err){
      if(err){
        console.log('Failed to register')
        res.json({message: false, str: 'Email already in database, please log in'})
      } else{
        console.log('Successfully registered')
        res.json({message: true, id: user._id, name: user.first_name + ' ' + user.last_name})
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
          console.log('good login')
          res.json({message: true, id: result._id, name: result.first_name + ' ' + result.last_name})
        } else{
          console.log('unsuccessful login, incorrect password')
          res.json({message: false, str: 'Password is incorrect'})
        }
      }
    })
  },



}



// *******************End*******************
