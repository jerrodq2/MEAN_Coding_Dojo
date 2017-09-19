var express = require('express');
var app = express();
var path = require('path')
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/integrating_mongoose');
var RabbitSchema = new mongoose.Schema({
 name: String,
 age: Number,
 color: String
})
var Rabbit = mongoose.model('Rabbit', RabbitSchema); // We are setting this Schema in our Models as 'User'


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/static'));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');



app.get('/', function(req, res) {
  Rabbit.find({}, function(err, rabbits){
    if(err){ console.log(err)}
    res.render("index", {rabbits: rabbits});
  })
})
app.get('/mongooses/new', function(req, res){
  res.render('new.ejs')
})
app.post('/mongooses', function(req, res){
  console.log(req.body)
  var r = req.body;
  var rabbit = new Rabbit({name: r.name, age: r.age, color: r.color})
  rabbit.save(function(err){
    if(err){
      console.log('There was an error')
    } else {
      console.log('Successfull addition')
    }
  })
  res.redirect('/')
})

app.get('/mongooses/:id/destroy', function(req, res){
  Rabbit.remove({_id: req.params.id}, function(err){
    console.log(req.params.id)
    if(err){
      console.log('Failed')
    } else{
      console.log('Success!')
    }
  })
  res.redirect('/')
})

app.get('/mongooses/:id', function(req, res){
  Rabbit.find({_id: req.params.id}, function(err, rabbit){
    res.render('show.ejs', {rabbit: rabbit[0], id: req.params.id})
  })
})

app.get('/mongooses/:id/edit', function(req, res){
  Rabbit.find({_id: req.params.id}, function(err, rabbit){
    if(err){console.log(err)}
    res.render('edit.ejs', {rabbit: rabbit[0]})
  })
})

app.post('/mongooses/:id', function(req, res){
  var r = req.body
  Rabbit.update({_id: req.params.id},{$set: {name:r.name, age: r.age, color: r.color }}, function(err){
    if(err){
      console.log("Didn't update")
    } else{
      console.log('SUCCESS!')
    }
    res.redirect('/')
  })
})

app.listen(5000);
