var express = require('express'),
    app = express(),
    path = require('path'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'), // this is in the mongoose.js file in full mean
    server = app.listen(5000); // this is ordinarily at the bottom

mongoose.Promise = global.Promise;
//This is so you can use an alternative promise library than the default one. A "Promise" represents the eventual result of an asynchronous operation. Basically, in Javascript, asynchronous code is when code stops being read from top to bottom, such as if you make an ajax call, your code stops running until the call you made returns (successfully or otherwise). An example is the code you use in your factories to hit a route: "factory.login = function(data, callback){$http.post('/login', data).then(....)", though this uses a callback instead of a promise.
// basically, doing this allows use to use an alternative to mongooses default promises, though I only used it once in this project, I instead used callbacks normally, this example as shown below is a callback that could have been changed to a promise format:
// quote.save(function(err){
//   if(err){
//     res.render('errors', {err: err})
//   } else {
//     res.redirect('/quotes')
//   }}
// )




// ********* THE BELOW CODE WOULD BE IN MONGOOSE.JS OR THE MODEL FILES IN FULL MEAN ****************
mongoose.connect('mongodb://localhost/quoting_dojo');
// mongoose.connect actually connects to the mongoDB, and specifically which database in it, I usually name them after the project
var QuoteSchema = new mongoose.Schema({
 name: {type: String, required: true, minlength: 4},
 quote: {type: String, required: true, minlength: 10},
 likes: Number
}, {timestamps: true})
var Quote = mongoose.model('Quote', QuoteSchema); // We are setting this Schema in our Models as 'User'
// the above code is an example of setting a schema or creating a model/table in the DB. You give the column a name, usually with "Schema" attached to it, though not necessary as a variable, make it = new mongoose.schema, then open a parenthesis and curly bracket. You create it like an object, since it is stored in JSON format (JavaScript Object Notation), so each column is undercase and followed by a colon : then another object, with it's type and validations. The timestamps: true, gives it created_at and updated_at by default. Finally, we make the schema which was in a variable until now a model with the last line, the name of what is in the quote marks will be what it is in the DB. BUT, all models are saved plural, so it would be "quotes" in the model, not "quote". But The basic format is below:
// var NameSchema = new mongoose.Schema({
//   column: {type: String,},
//   column: {type: String,}
// }, {timestamps: true})
// var Name = mongoose.model('Name_of_model_in_DB_here', NameSchema)



app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/static'));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');




// ***************** THE BELOW CODE WOULD BE IN THE SERVER ROUTES AND CONTROLLER FILES ***************

app.get('/', function(req, res) {
 res.render("index");
})


//example of creating and saving a new record below, see the bottom of the file for another example.
app.post('/quotes', function(req, res){
  req.body.likes = 0;
  //after creating a likes key in req.body it looks like:
  // { name: 'Jerrod',
  // quote: 'quote here...',
  // likes: 0 }

  var quote = new Quote(req.body);
  //after creating a variable with req.body, it's changed to:
  // { name: 'Jerrod',
  // quote: 'quote here...',
  // likes: 0,
  // _id: 59c077e6cb03627e8cc46657 }
  //since I gave it everything, it just gives it an id or _id since that is how it is in MongoDB. If i didn't give it anything, it would still look like the object above, but lack that column/key, which could still be created before the .save,otherwise it'll set off my validations

  quote.save(function(err){
    // the model name followed by ".save", open parenthesis and a function, callback in this case. the err is incase there are any errors in the saving, which would be the validations normally.
    if(err){ //the validations would be the err
      res.render('errors', {err: err})
    } else {
      res.redirect('/quotes')
    }}
  )
})
// So for a save, you create a variable with var a = new ModelName(code here...), then type a.save(function here...), IMPORTANT Note: always refer to the models as uppercase and single, such as var quote = new Quote <= see there



// example of finding all of the quotes below, how to sort, and as a promise, though you can't see the promise at work without a nested promise
app.get('/quotes', function(req, res){
  Quote.find({}).sort({likes: -1}).exec(function(err, results){
    //The find above grabs all of the data from Quote model, always put the model singular and uppercase in moongoose. Model.find() takes conditions, but when empty finds everything. And .sort sorts by the condition you give it in an object format, I use "-1" to sort descendingly, from highest to lowest. Lastly, .exec() is a promise at work, but you can't see more of it with no nested promises, so it looks like a callback. It's when you have nested code that you can really see the difference. The main difference here is that with callbacks you have "Model.query(something, callbackfunction)", but with a promise it's "Model.query(anything).exec(promise/function here)", so in the callback, the function is inside the queries opened parenthese, whereas with a promise it is after in an exec() block.
    if(err){console.log(err)}
    // IMPORTANT Note: the results from find({}) is an array of objects
    res.render('quotes', {quotes: results})
  })
})


// example of finding one below
app.get('/quotes/like/:id', function(req, res){
  Quote.find({_id: req.params.id}, function(err, result){
    //this is how you find a single record, Model.find({_id: id_here}, function....). I name the "result" or what I actually get back from the db, result in this case.
    //IMPORTANT Note: the query result is actually an array of objects, even though there is only one, hence the "result[0].likes below"
    var like = result[0].likes;
    like += 1;
    //example of update below, takes a key to locate the record(s) to update, then anther object to actually update it with "$set" as a key to yet a third object. Format: "Quote.update({key:value, {$set: {key: new_value}} ,function()  })"
    Quote.update({_id: req.params.id}, {$set: {likes: like}}, function(err){
      if(err){
        res.render('errors', {err: err})
      }
      res.redirect('/quotes')
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
