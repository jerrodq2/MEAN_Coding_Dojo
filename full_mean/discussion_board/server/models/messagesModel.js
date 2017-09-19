var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TopicSchema = new mongoose.Schema({
  topic:{type: String, required: true},
  description:{type: String, minlength: 10, required: true},
  category: {type: String, required: true},
  username: {type: String, required: true},
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  messages: [{type: Schema.Types.ObjectId, ref: 'Message'}],

}, {timestampe: true});
var MessageSchema = new mongoose.Schema({
  message:{type: String, minlength: 10, required: true},
  username: {type: String, required: true},
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  _topic: {type: Schema.Types.ObjectId, ref:'Topic'},
}, {timestampe: true});

var CommentSchema = new mongoose.Schema({
  comment:{type: String, minlength: 10, required: true},
  username: {type: String, required: true},
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  _message: {type: Schema.Types.ObjectId, ref: 'Message'}
}, {timestampe: true});


var Topic = mongoose.model('Topic', TopicSchema);
var Message = mongoose.model('Message', MessageSchema);
var Comment = mongoose.model('Comment', CommentSchema);





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
