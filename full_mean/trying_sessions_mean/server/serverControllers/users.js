var mongoose = require('mongoose')
var User = mongoose.model('User')

module.exports = {
  check: function(req, res){
    //this method is just so I can see the current status of the session for understanding
    console.log("Current status of session: ");
    console.log(req.session);
    console.log("************");
    res.json(req.session.user)
  },


  register: function(req, res){
    var user = new User(req.body)
    user.save(function(err){
      if(err){
        console.log('Failed to register')
        res.json({message: false, str: 'Email already in database, please log in'})
      } else{
        req.session.user = req.body //This would need to be changed a bit, we don't want the password saved in the session, and in the "req.body" is isn't hashed. We could make req.session.user = user, which would make the password in the session equal to the hashed version, but we still have no need to keep the password in the session, this just to keep things simple. See below for a more realistic example:
        //req.session.user = {first_name: user.first_name, _id: user._id, last_name: user.last_name}
        req.session.user._id = user._id
        console.log(req.session.user); //this shows just the part of the session we created

        //the below code is an example of how I keep people logged in or set a time limit, see the bottom of the page for a detailed explanation.
        if (req.body.remembered) {
          req.session.cookie.expires = null
        } else {
          req.session.cookie.maxAge = 60000 //This is milliseconds, equal to one minute, 1000 milliseconds equals one second
        }

        console.log('Successfully registered')
        console.log(req.session); //This shows the entire session, cookie included
        /* Below is an example of what the full session would look like, in this example the maxAge was set to one minute, if it wasn't set, the default would null for the "originalMaxAge" and "_expires":
        Session {
          cookie:
           { path: '/',
             _expires: 2017-09-29T21:53:03.760Z,
             originalMaxAge: 60000,
             httpOnly: true },
          user:
           { _id: '59cdbe2f2e74f38acba26df7',
             updatedAt: '2017-09-29T03:29:51.798Z',
             createdAt: '2017-09-29T03:29:51.798Z',
             first_name: 'Jack',
             last_name: 'turner',
             email: 'jack@j.com',
             password: '$2a$08$RxFI3t9uTrgL1B7Hh4A0yuxRutNOfGZgC8cqLS/UJIA2b50gqW82q',
             __v: 0 } }
        */
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
          req.session.user = result //once again, as stated in the register method, this would need to be changed, we're storing sensitive info like the password (even though it's hashed) in the session.
          console.log(req.session.user);
          if (req.body.remembered) {
            req.session.cookie.expires = null
          } else {
            req.session.cookie.maxAge = 60000 //This is milliseconds, equal to one minute, 1000 milliseconds equals one second
          }
          console.log("full session below:");
          console.log(req.session);
          res.json({message: true, id: result._id})
        } else{
          console.log('unsuccessful login, incorrect password')
          res.json({message: false, str: 'Password is incorrect'})
        }
      }
    })
  },




  logout: function(req, res){
    console.log("Entered the logout server function");
    req.session.destroy()
    console.log("Successfully logged out");
    res.json({message: true})
  },



}

// ********************** DETERMING SESSION TIME TO LIVE **********************
/*
Above, you see this code:
if (req.body.remembered) {
  req.session.cookie.expires = null
} else {
  req.session.cookie.maxAge = 60000
}

Basically, I have checkbox in the html form that asks if they want to be remembered, if they click it, it will be true. If they don't, it will be false. So, I use that to determine how long the session will live with the above code. If it is true, I set the req.session.cookie.expires to null, which it is by default. In which case, they will stay logged in until they log out. However, if they didn't check the checkbox, I set the req.session.cookie property "maxAge" to 60,000. This determines how long the session will persist or live. This is measured in milliseconds, and there are 1,000 milliseconds in one second. So, 60,000 milliseconds is equal to one minute. So, after one minute, this session will be deleted. You can change this to suit you're needs, see the different values of milliseconds to see some of your options

30 min = 1,800,000 ms
1 hour = 3,600,000 ms
1 day = 86,400,000 ms
1 week = 604,800,000 ms




*/



// *******************End*******************
