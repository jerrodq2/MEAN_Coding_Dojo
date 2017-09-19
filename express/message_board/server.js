var express = require('express'),
    app = express(),
    path = require('path'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    server = app.listen(5000),
    Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/databaseName');
var MessageSchema = new mongoose.Schema({
 message: {type: String, required: true, minlength: 10},
 name: {type: String, required: true, minlength:4, maxlength: 30},
 comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamps: true});
var CommentSchema = new mongoose.Schema({
  comment: {type: String, required: true, minlength: 10, maxlength: 150},
  name: {type: String, required: true, minlength: 4, maxlength: 30},
  _message: {type: Schema.Types.ObjectId, ref: 'Message'}
}, {timestamps: true});
var Message = mongoose.model('Message', MessageSchema);
var Comment = mongoose.model('Comment', CommentSchema)

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/static'));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');



app.get('/', function(req, res) {
  Message.find({}).populate('comments').exec(function(err, results){
    if(err){console.log(err)}
    res.render("index", {messages: results});
  })
})

app.post('/message', function(req, res){
  var message = new Message(req.body)
  message.save(function(error){
    if(error){
      Message.find({}).populate('comments').exec(function(err, results){
        if(err){console.log(err)}
        res.render("index", {messages: results, err: error});
      })
    } else{
      res.redirect('/')
    }
  })
})
app.post('/comment/:id', function(req, res){
  Message.findOne({_id: req.params.id}, function(err, result){
    var comment = new Comment(req.body);
    comment._message = result._id;
    comment.save(function(err){
      result.comments.push(comment);
      result.save(function(err){
        if(err){console.log('Error')}
        res.redirect('/')
      })
    })
  })
})



// How to pull the users or all the documents from the User collection to pass to the view

// app.get('/', function(req, res) {
//   User.find({}, function(err, results){
//     if (err){
//       console.log(err)
//     }
//     res.render("index", {users: results});
//   });
// })
          // The above function is asynchronous, where it's almost like a time delay, and the data is only accessible within this function, so i have to return or render the page within the function.


// example of database entry

// app.post('/users', function(req, res){
//   var user = new User({name: req.body.name, age: req.body.age});
//   user.save(function(err){
//     if(err){
//       console.log('something went wrong')
//     } else {
//       console.log('successfully added a user!')
//     }
//   })
//   res.redirect('/');
