var mongoose = require('mongoose')
var User = mongoose.model('User')
var Topic = mongoose.model('Topic')
var Post = mongoose.model('Post')
var Comment = mongoose.model('Comment')

module.exports = {
  register: function(req, res){
    var user = new User(req.body)
    user.save(function(err){
      if(err){
        console.log('Failed to register')
        res.json({message: false, str: 'Username already in database, please log in'})
      } else{
        console.log('Successfully registered')
        res.json({message: true, id: user._id, username: user.username})
      }
    })
  },
  login: function(req, res){
    User.findOne({username:req.body.username}, function(err, result){
      if(err){
        console.log('unsuccessful login, incorrect email')
        res.json({message: false, str: 'Username is incorrect'})
      } else if(!result){
        console.log('unsuccessful login, incorrect email')
        res.json({message: false, str: 'Username is incorrect'})
      } else {
        var check = result.validPassword(req.body.password)
        if(check){
          console.log('good login')
          res.json({message: true, id: result._id, username: result.username})
        } else{
          console.log('unsuccessful login, incorrect password')
          res.json({message: false, str: 'Password is incorrect'})
        }
      }
    })
  },
  userinfo: function(req, res){
    User.findOne({_id: req.params.id}, function(err, user){
      Topic.find({userId: req.params.id}, function(err, topics){
        Post.find({userId: req.params.id}, function(err, posts){
          Comment.find({userId: req.params.id}, function(err, comments){
            res.json({topics: topics, posts: posts, comments: comments, user: user})
          })
        })
      })
    })
  },


}



// *******************End*******************
