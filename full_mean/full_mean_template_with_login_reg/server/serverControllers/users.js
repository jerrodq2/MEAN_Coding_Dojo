var mongoose = require('mongoose')
var User = mongoose.model('User')

//Basic controller for login/register functions, session stuff at the bottom.
module.exports = {
  register: function(req, res){
    var user = new User(req.body)
    user.save(function(err){
      if(err){
        console.log('Failed to register')
        res.json({message: false, str: 'Email already in database, please log in'})
      } else{
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
          console.log('good login')
          res.json({message: true, id: result._id})
        } else{
          console.log('unsuccessful login, incorrect password')
          res.json({message: false, str: 'Password is incorrect'})
        }
      }
    })
  },

  logout: function(req, res){
  // req.session.destroy()
  //the above code is optional, used to delete sessions
  res.json({message: true})
},


}// end of controller

/* code for implementing sessions below:
req.session.user = {_id: user._id, first_name:user.first_name, last_name:user.last_name}

if (req.body.remembered) {
  req.session.cookie.expires = null
} else {
  req.session.cookie.maxAge = 60000 //This is milliseconds, equal to one minute, 1000 milliseconds equals one second
}

*/


// *******************End*******************
