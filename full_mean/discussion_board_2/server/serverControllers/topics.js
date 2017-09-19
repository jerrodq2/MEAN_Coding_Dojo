var mongoose = require('mongoose')
var Topic = mongoose.model('Topic')
var Post = mongoose.model('Post')
var Comment = mongoose.model('Comment')
var Category = mongoose.model('Category')

module.exports = {
  find: function(req, res){
    Topic.find({}).populate('posts').exec(function(err, results){
      res.json(results)
    })
  },
  topic: function(req, res){
    Topic.findOne({_id: req.params.id}).populate({path: 'posts', populate:{path: 'comments'}}).exec(function(err, result){
      if(err){
        console.log(err)
      }
      return res.json(result)
    })
  },
  createTopic: function(req, res){
    var topic = new Topic(req.body)
      Category.find({}, function(err, categories){
        var check = false
        for(var i = 0; i < categories.length; i++){
          if(categories[i].name == req.body.category){
            check = true
            break
          }
        }
        if(!check){
          return res.json({message: false, str: 'Category does not exist in db'})
        } else{
          console.log('oh');
          topic.save(function(err){
            if(err){
              return res.json({message: false, str: 'There was an error, please try again'})
            } else{
              return res.json({message: true})
            }
          })
        }
      })
    },
  addPost: function(req, res){
    Topic.findOne({_id: req.body.tid}, function(err, topic){
      var post = new Post(req.body)
      post.likes = 0
      console.log(post);
      post._topic = topic.id
      post.save(function(err){
        if(err){
            console.log(err);
          return res.json({message: false, str: 'There was an error, please try again'})
        } else{
          topic.posts.push(post)
          topic.save(function(err){
            if(err){
              console.log(err)
            } else{
              res.json({message: true})
            }
          })
        }
      })
    })
  },
  addComment: function(req, res){
    Post.findOne({_id: req.body.pid}, function(err, post){
      var comment = new Comment(req.body)
      comment._post = post._id
      comment.save(function(err){
        if(err){
          return res.json({message: false, str: 'There was an error, please try again'})
        } else{
          post.comments.push(comment)
          post.save(function(err){
            if(err){
            } else{
              res.json({message: true})
            }
          })
        }
      })
    })
  },
  like: function(req, res){
    Post.findOne({_id: req.params.pid}, function(err, post){
      if(post.userId == req.params.uid){
        return res.json({message: false, str: 'You cannot vote on a post You created' })
      }
      post.likes++
      post.save(function(err){
        res.json({message: true})
      })
    })
  },
  categories: function(req, res){
    Category.find({}, function(err, results){
      res.json(results)
    })
  },

}



// *******************End*******************
