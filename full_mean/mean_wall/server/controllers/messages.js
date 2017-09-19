var mongoose = require('mongoose');
var Message = mongoose.model('Message');
var Comment = mongoose.model('Comment');

module.exports = {
  find: function(req, res){
    Message.find({}).populate('_comments').exec( function(err, results){
      res.json(results);
    })
  },
  create: function(req, res){
    var mess = new Message(req.body);
    console.log(req.body);
    mess.date = new Date();
    mess.save(function(err){
      if(err){
        console.log('error')
        res.json({message: false})
      } else{
        res.json({message: true})
      }
    })
  },
  newComment: function(req, res){
    Message.findOne({_id: req.body.mid}, function(err, message){
      var comment = new Comment(req.body);
      comment._message = message._id;
      comment.date = new Date()
      console.log(comment);
      comment.save(function(err){
        if(err){
          res.json({message: false})
        } else{
          message._comments.push(comment);
          message.save(function(err){
            if(err){
              res.json({message: false})
            } else{
              res.json({message: true})
            }
          })
        }
      })
    })
  },

}
