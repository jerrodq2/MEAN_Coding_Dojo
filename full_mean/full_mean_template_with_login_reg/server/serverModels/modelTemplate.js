var mongoose = require('mongoose')
var Schema = mongoose.Schema; //used in associations when specifying the type

var ModelSchema = new mongoose.Schema({
  data:{
    type: String,
    required: true,
    minlength: 4,
  },
}, {timestamps: true})

mongoose.model('ExampleModel', ModelSchema)


// *******************End*******************

    // ASSOCIATIONS STUFF BELOW************

    /*

    var Schema = mongoose.Schema;
    var PostSchema = new mongoose.Schema({
     text: {type: String, required: true },
     comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
    }, {timestamps: true });
    var CommentSchema = new mongoose.Schema({
     _post: {type: Schema.Types.ObjectId, ref: 'Post'},
     text: {type: String, required: true }
    }, {timestamp: true });
    mongoose.model('Post', PostSchema);
    mongoose.model('Comment', CommentSchema);
    var Post = mongoose.model('Post');
    var Comment = mongoose.model('Comment');
    app.get('/posts/:id', function (req, res){
     Post.findOne({_id: req.params.id})
     .populate('comments')
     .exec(function(err, post) {
          res.render('post', {post: post});
            });
    });
    app.post('/posts/:id', function (req, res){
      Post.findOne({_id: req.params.id}, function(err, post){
             var comment = new Comment(req.body);
             comment._post = post._id;
             post.comments.push(comment);
             comment.save(function(err){
                     post.save(function(err){
                           if(err) { console.log('Error'); }
                           else { res.redirect('/'); }
                     });
             });
       });
     });

     */
