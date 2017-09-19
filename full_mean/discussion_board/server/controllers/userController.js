var mongoose = require('mongoose');
var User = mongoose.model('User');
var Topic = mongoose.model('Topic');
var Messages = mongoose.model('Message');
var Comments = mongoose.model('Comment');

module.exports = {
  findOne: function(req, res){
    User.findOne({_id: req.params.id}, function(err, user){
      Topic.find({userId: user._id}, function(errorT, topics){
        Messages.find({userId: user._id}, function(err, messages){
          Comments.find({userId: user._id}, function(err, comments){
            res.json({userinfo: user, topics: topics, messages: messages, comments, comments})
          })
        })
      })
    });
  },
  register: function(req, res){
    var user = new User(req.body);
    user.save(function(err){
      if(err){
        res.json({message: false})
      } else{
        res.json({message: true, id: user._id, username: user.username})
      }
    })
  },
  login: function(req, res){
    User.findOne({username:req.body.username}, function(err, user){
      if(err){
        res.json({message: false});
      } else if(!user){
        res.json({message: false});
      } else {
        var check = user.validPassword(req.body.password)
        if(check){
          console.log('good login');
          res.json({message: true, id: user._id, username: user.username});
        } else{
          console.log('unsuccessful login');
          res.json({message: false});
        }
      }
    })
  }




}
