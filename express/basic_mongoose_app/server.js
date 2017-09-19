var express = require('express');
var app = express();
var path = require('path')
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/basic_mongoose');
var UserSchema = new mongoose.Schema({
 name: String,
 age: Number
})
mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'
var User = mongoose.model('User')

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/static'));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
  User.find({}, function(err, users){
    if (err){
      console.log(err)
    }
    res.render("index", {users: users});
  });
})

app.post('/users', function(req, res){
  var user = new User({name: req.body.name, age: req.body.age});
  user.save(function(err){
    if(err){
      console.log('something went wrong')
    } else {
      console.log('successfully added a user!')
    }
  })
  res.redirect('/');
})


var server = app.listen(5000);
