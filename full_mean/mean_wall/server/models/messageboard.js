var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MessageSchema = new mongoose.Schema({
 username: {
   type: String,
   required: true,
   minlength: 4,
 },
 message:{
   type: String,
   required: true,
   minlength: 10
 },
 _comments:[{
   type: Schema.Types.ObjectId,
   ref: 'Comment'
 }],
 date:{
   required: true,
   type: Date,
 }
}, {timestampe: true});

var Message = mongoose.model('Message', MessageSchema);

var CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
    minlength: 10
  },
  username:{
    type: String,
    required: true,
    minlength: 4,
  },
  _message:{
    type: Schema.Types.ObjectId,
    ref: 'Messsage'
  },
  date:{
    required: true,
    type: Date,
  }
}, {timestampe: true});
var Comment = mongoose.model('Comment', CommentSchema);
