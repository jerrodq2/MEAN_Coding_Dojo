var mongoose = require('mongoose');
var Topic = mongoose.model('Topic');
var Message = mongoose.model('Message');
var Comment = mongoose.model('Comment');

module.exports = {
  createTopic: function(req, res){
    var topic = new Topic(req.body)
    topic.save(function(err){
      if(err){
        console.log('failed to create topic')
        res.json({message: false})
      } else{
        console.log('good job')
        res.json({message: true})
      }
    })
  },
  findAll: function(req, res){
    Topic.find({}).populate('messages').exec(function(err, results){
      res.json(results)
    })
  },
  findOne: function(req, res){
    Topic.findOne({_id: req.params.id}).populate({path: 'messages', populate: {path: 'comments'}}).exec( function(err, results){
      res.json(results);
    })
  },
  addMessage: function(req, res){
    Topic.findOne({_id: req.body._topic}, function(err, topic){
      var message = new Message(req.body);
      message.save(function(err){
        if(err){
          res.json({message: false});
        } else {
          topic.messages.push(message);
          console.log('success');
          topic.save(function(err){
            res.json({message: true});
          })
        }
      })
    })
  },

  addComment: function(req, res){
    Message.findOne({_id: req.body._message}, function(err, message){
      var comment = new Comment(req.body);
      comment.save(function(err){
        if(err){
          res.json({message: false});
        } else {
          message.comments.push(comment);
          console.log('Success');
          message.save(function(err){
            res.json({message: true});
          })
        }
      })
    })
  },

}
