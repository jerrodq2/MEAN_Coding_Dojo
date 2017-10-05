var mongoose = require('mongoose')
var User = mongoose.model('User')
var bcrypt = require('bcrypt')

//Basic controller for login/register functions, session stuff at the bottom.
module.exports = {
  create: function(req, res){
    var user = new User(req.body)
    user.save()
    .then(function(){
      console.log('Successfully registered');
      req.session.user = {username: user.username, email: user.email, _id: user._id}
      if (req.body.remembered) {
        req.session.cookie.expires = null
      } else {
        req.session.cookie.maxAge = 7200000 //This is milliseconds, equal to two hours, 1000 milliseconds equals one second
      }
      res.json({message: true, id: user._id, username: user.username})
    })
    .catch(function(err){
      console.log('************* Failed to register due to: ');
      console.log(err);

      //Below is code to send back a more specific error message, such as the username/email is already taken instead of 'Username or email'
      var duplicate_username_error = 'E11000 duplicate key error collection: discussion_board_3.users index: username_1 dup key: { : "' + req.body.username + '" }'
      var duplicate_email_error = 'E11000 duplicate key error collection: discussion_board_3.users index: email_1 dup key: { : "' + req.body.email + '" }'
      if (err.message == duplicate_username_error) {
        console.log('*********Duplicate Username error');
        var str = 'Username is already in the database'
      } else if (err.message == duplicate_email_error) {
        console.log('*********Duplicate Email error');
        var str = 'Email is already in the database'
      } else {
        var str = 'An unkown error occured, please see terminal....'
      }
      res.json({message: false, str: str})
    })
  },

  /*  original version of the register method below, not using promises

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

  */


  login: function(req, res){
    User.findOne({username: req.body.username}).exec()
    .then(function(user){
      if(!user){
        console.log("************* Couldn't log in, wrong username.");
        res.json({message: false, str: 'Username not found'})
      }
      var check = user.validPassword(req.body.password)
      if(!check){
        console.log("************* Couldn't log in, wrong password.");
        res.json({message: false, str: 'Incorrect Password'})
      }
      return user
    })
    .then(function(user){
      console.log('Good login');
      req.session.user = {username: user.username, email: user.email, _id: user._id}
      if (req.body.remembered) {
        req.session.cookie.expires = null
      } else {
        req.session.cookie.maxAge = 7200000 //This is milliseconds, equal to two hours, 1000 milliseconds equals one second
      }
      res.json({message: true, id: user._id, username: user.username})
    })
    .catch(function(err){
      console.log("************* Couldn't log in, there was an error:");
      console.log(err);
      res.json({message: false, str: 'There was an error'})
    })
  },

  /*  original version of the login method below, not using promises
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
  */

  logout: function(req, res){
  req.session.destroy()
  res.json({message: true})
  },


  findOne: function(req, res){
    User.findOne({_id: req.params.id}, {password: 0, comments: 0}).exec()
    .then(function(user){
      res.json({message: true, user: user})
    })
    .catch(function(err){
      console.log('There was an error finding the user');
      res.json({message: false, str: "Couldn't find the user"})
    })
  },


  update: function(req, res){
    if(!req.session.user)
      return res.json({str: "Not logged in"})
    User.update({_id: req.session.user._id}, {$set: req.body}, {runValidators: true}).exec()
    .then(function(){
      res.json({str: "Info Successfully updated"})
    })
    .catch(function(err){
      console.log("************ Couldn't update main user info:");
      console.log(err);

      var duplicate_username_error = 'E11000 duplicate key error collection: discussion_board_3.users index: username_1 dup key: { : "' + req.body.username + '" }'
      var duplicate_email_error = 'E11000 duplicate key error collection: discussion_board_3.users index: email_1 dup key: { : "' + req.body.email + '" }'
      if (err.message == duplicate_username_error) {
        var str = 'Username is already in the database'
      } else if (err.message == duplicate_email_error) {
        var str = 'Email is already in the database'
      } else {
        var str = 'An unkown error occured, please see terminal....'
      }

      res.json({str: str})
    }) //end of the .catch()
  }, //end of update



  update_password: function(req, res){
    console.log("in the server");
    //below, I hash the new password since the update() query probably doesn't trigger the pre save model method which automatically hashes passwords when we create a user. If I used .save() instead of .update(), I probably wouldn't have to do this
    if(!req.session.user)
      return res.json({str: "Not logged in"})
    User.findOne({_id: req.session.user._id}).exec()
    .then(function(user){
      var check = user.validPassword(req.body.old_password)
      if(!check)
        return res.json({str: "Old Password was incorrect"})
      return user
    })
    .then(function(user){
      req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8)) //I hash the new password
      return User.update({_id: req.session.user._id}, {$set: req.body}, {runValidators: true}).exec()
    })
    .then(function(){
      res.json({str: "Password Successfully Updated"})
    })
    .catch(function(err){
      console.log("******** There was an error updating the user password:");
      console.log(err);
      res.json({str: "There was an error updating the password."})
    })
  },


}// end of controller



// *******************End*******************
