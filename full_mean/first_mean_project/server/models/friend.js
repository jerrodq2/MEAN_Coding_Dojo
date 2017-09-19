// require mongoose
var mongoose = require('mongoose');
// create the schema
var FriendSchema = new mongoose.Schema({
 name: String,
 age: Number
})
mongoose.model('Friend', FriendSchema); // We are setting this Schema in our Models as 'User'
