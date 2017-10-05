var mongoose = require('mongoose')
var Topic = mongoose.model('Topic')
var Comment = mongoose.model('Comment')

module.exports = {
  find: function(req, res){
    Topic.find({}).populate('comments').populate('user_id').exec()
    .then(function(topics){
      res.json({topics: topics})
    })
  },


  create: function(req, res){
    var categories = ['General', 'Languages', 'Frameworks', 'Web Development', 'Other']
    console.log(req.body.category);
    if (!categories.includes(req.body.category))
      return res.json({message: false, str:"You must select a valid category"})

    var topic = new Topic(req.body)
    topic.user_id = req.session.user._id
    topic.save()
    .then(function(){
      res.json({message: true})
    })
    .catch(function(err){
      console.log("************There was an error creating the topic:");
      console.log(err);
      res.json({message: false, str:"there was an error"})
    })
  },


  findOne: function(req, res){
    Topic.findOne({_id: req.params.id}).populate('user_id').populate({path: 'comments', populate: {path: 'user_id'} }).exec()
    .then(function(topic){
      res.json(topic)
    })
  },


  delete: function(req, res){
    Topic.findOne({_id: req.params.id}).exec()
    .then(function(topic){
      if(topic.user_id != req.session.user._id){
        res.json({title: "nice try"})
      } else {
        console.log("*********************");
        return topic.remove()
      }
    })
    .then(function(){
      return Topic.find({}).populate('comments').populate('user_id').exec()
      .then(function(topics){
        return res.json({topics: topics})
      })
    })
    .catch(function(err){
      console.log("***************");
      console.log("***************");
      console.log("***************");
      console.log("There was a problem trying to delete the topic");
      console.log(err);
      return res.json({})
    })
  },



  comment_create: function(req, res){
    var topic_holder;// since I have to return the save() in the first .then(), I don't want to have to re-query the db to find the topic, so I'll just put it in this variable at the start of that .then()
    Topic.findOne({_id: req.body.topic_id}).exec()
    .then(function(topic){
      topic_holder = topic
      var comment = new Comment(req.body)
      comment.likes = 0
      comment.user_id = req.session.user._id
      return comment.save()
    })
    .then(function(comment){
      topic_holder.comments.push(comment)
      return topic_holder.save()
    })
    .then(function(comment){
      return Topic.findOne({_id: req.body.topic_id}).populate('user_id').populate({path: 'comments', populate: {path: 'user_id'} }).exec()
      .then(function(topic){
        return res.json({message: true, topic: topic})
      })
    })
    .catch(function(err){
      console.log("********** There was an error in comment_create:");
      console.log(err);
      res.json({message: false, str: "There was an error..."})
    })
  },


  like: function(req, res){
    Comment.findOne({_id: req.params.id}).exec()
    .then(function(comment){
      comment.likes += 1
      return comment.save()
    })
    .then(function(comment){
      return Topic.findOne({_id: req.params.topic_id}).populate('user_id').populate({path: 'comments', populate: {path: 'user_id'} }).exec()
      .then(function(topic){
        return res.json(topic)
      })
    })
    .catch(function(err){
      console.log("*******There was an error adding the like");
      console.log(err);
      return res.json({})//this is just lazy implementation, ordinarily I would want to return the topic with an error message
    })
  },

}



// *******************End*******************
