var mongoose = require('mongoose'),
    bcrypt = require('bcrypt')
var UserSchema = new mongoose.Schema({
 first_name: {
   type: String,
   required: true,
 },
 last_name: {
   type:String,
   required: true,
 },
 email: {
   type: String,
   unique: true,
   required: true
 },
 password:{
   type: String,
   required: true,
   minlength: 8,
 },


}, {timestamp: true});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.pre('save', function(done) {
    this.password = this.generateHash(this.password);
    done();
});

var User = mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'





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
