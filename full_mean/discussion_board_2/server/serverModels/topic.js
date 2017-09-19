var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TopicSchema = new mongoose.Schema({
  topic:{
    type: String,
    required: true,
    minlength: 4,
  },
  category:{
    type: String,
    required: true,
  },
  description: {
    type: String,
    minlength: 10,
    required: true
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],
}, {timestamps: true})

var PostSchema = new mongoose.Schema({
  post:{
    type: String,
    required: true,
    minlength: 4,
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  username:{
    type: String,
    required: true,
  },
  _topic:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  likes:{
    type: Number,
    required: true,
  },
}, {timestamps: true})

var CommentSchema = new mongoose.Schema({
  comment:{
    type: String,
    required: true,
    minlength: 4,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  username:{
    type: String,
    required: true,
  },
  _post:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  }
}, {timestamps: true})

var CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
}, {collection: 'Categorys'})
mongoose.model('Topic', TopicSchema)
mongoose.model('Post', PostSchema)
mongoose.model('Comment', CommentSchema)
mongoose.model('Category', CategorySchema)


// *******************End*******************

    // ASSOCIATIONS STUFF BELOW************
    //
    //
    // var Schema = mongoose.Schema;
    // var PostSchema = new mongoose.Schema({
    //  text: {type: String, required: true },
    //  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
    // }, {timestamps: true });
    // var CommentSchema = new mongoose.Schema({
    //  _post: {type: Schema.Types.ObjectId, ref: 'Post'},
    //  text: {type: String, required: true }
    // }, {timestamp: true });
    // mongoose.model('Post', PostSchema);
    // mongoose.model('Comment', CommentSchema);
    // var Post = mongoose.model('Post');
    // var Comment = mongoose.model('Comment');
    // app.get('/posts/:id', function (req, res){
    //  Post.findOne({_id: req.params.id})
    //  .populate('comments')
    //  .exec(function(err, post) {
    //       res.render('post', {post: post});
    //         });
    // });
    // app.post('/posts/:id', function (req, res){
    //   Post.findOne({_id: req.params.id}, function(err, post){
    //          var comment = new Comment(req.body);
    //          comment._post = post._id;
    //          post.comments.push(comment);
    //          comment.save(function(err){
    //                  post.save(function(err){
    //                        if(err) { console.log('Error'); }
    //                        else { res.redirect('/'); }
    //                  });
    //          });
    //    });
    //  });
