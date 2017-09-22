var express = require('express'),
    app = express(),
    path = require('path'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    server = app.listen(5000),
    Schema = mongoose.Schema;
mongoose.Promise = global.Promise; //This line allows us to use an alternate promise library instead of mongooses default promise library
mongoose.connect('mongodb://localhost/databaseName'); // connecting to the database, in this case, the database is literally named "databaseName"


//****************** foreign key schema/model example below *********************
//in the below schemas, the message and comment models are related, basically a many to one relationship, one message can have many comments, but a comment can only be for one message. See how to create them below.
var MessageSchema = new mongoose.Schema({
 message: {type: String, required: true, minlength: 10},
 name: {type: String, required: true, minlength:4, maxlength: 30},
 comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
 //in the line above, you see that for the model that is the many in the many-to-one relationship, we create a column, that is named after the other model (comment), but we save it plural, since there are many, so "comments:" and not "comment:", also, we put the object in an array. Basically, all comments saved under it are saved via their _id in this array. It looks like this:
 // comments:[ 582334ecaa2f0e1f1b8cb76d, 58233524aa2f0e1f1b8cb76e, 59c147c5d8c0c018b1194985 ]
 // Remember that, the many Model (many-to-one) saves the "one" model in an array format, with each index holding the _id, which if queries using the .populate() method, each index holds the actual object instead of the _id. So the format for this foreign key array in the schema is:
 // "ModelNamePlural: [ {type: Schema.Types.ObjectId, ref: 'ModelNameSingular'} ]"
}, {timestamps: true});

var CommentSchema = new mongoose.Schema({
  comment: {type: String, required: true, minlength: 10, maxlength: 150},
  name: {type: String, required: true, minlength: 4, maxlength: 30},
  _message: {type: Schema.Types.ObjectId, ref: 'Message'}
  //Comment is the one in the many-to-one relationship, so as opposed to the many (Message in this case), the foreign key column isn't an array, but merely a single instance/object. Message can have multiple comments, so that model has an array, but Comment can only have one Message _id, so it's saved as a single object. When writing the foreign key column, it is similar to the Message model above, the only differences are: you don't put the object in an array, and the name of the column is the model name singular with an underscore before it. So the format is:
  // "_ModelNameSingular: {type: Schema.Types.ObjectId, ref: 'ModelNameSingular'} "
}, {timestamps: true});
var Message = mongoose.model('Message', MessageSchema);
var Comment = mongoose.model('Comment', CommentSchema) // as always, we save the actual models as captialized and singular


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/static'));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


//***********************************************************************************************
//Below are the routes and controller logic see the first route for an example of a proimse, how it differes from callbacks, and to see what the .populate() method does

//************************* START OF PROMISE/CALLBACK/POPULATE EXAMPLE *********************
// Below you will see both a callback and promise, for clarification on the two, see the word doc "promises_and_callbacks_differences_and_examples", i've also added my below examples with more comments in that doc. Basically, a normal callback passes in a function as a parameter for the query, and has the error handler inside, and any other queries are nested inside of it.
// CALLBACK FORMAT EXAMPLE:
// User.find({}, function(err, query_result){
//   if (err){do something....}
//   Do other things or queries....
// }) ****end of callback format example
//In the example above, you could name "query_results" whatever you want, it is basically a variable that holds the results of the find() query in this example. The issue with callbacks, is since other queries that are nested inside of it, it can get hard to read and really indented, also if one query fails, the whole thing basically fails. The first query in the get route below is a callback, even though it uses .exec(), it puts a function in the .exec(), this function is a callback, and everything related to it has to be nested inside of it.

//PROMISE FORMAT EXAMPLE:
// User.find({}).exec()
//   .then(function(query_results){
//     do stuff......
//     return something
//   })
//   .catch(function(err){
//     if (err){ do something with the error....}
//   }) **** end of promise format example
// In the example above, .exec() executes the query and returns a promise/the query results. The .then() method, waits for the query to finish before doing anything, and the "query_results" is just a variable equal to whatever the .exec() or .then() before it returned. ALWAYS REMEMBER, exec() returns something by default, but .then() doesn't, so you need to return something inside of it, so the next .then() or whatever is after it has access to it. The good thing about promises is that there is no "callback hell", since you don't have nested queries, it is much easier to read. Also, the .catch() method acts as an error handler for all of your methods, even if you had one .exec() and ten .then() methods chained together.

app.get('/', function(req, res) {
  //The query below is a callback, the other Message.find({}) is a promise, but doesn't return anything to the page or applicaiton, it is just there as an example to show that they both do the same thing. I use the .exec() in the callback because I had to use .populate() which I explain below, so I pass my callback to the .exec() method.




  Message.find({}).populate('comments').exec(function(err, results){
    if(err){
      console.log(err)
    }
    console.log('******************');
    console.log(results);
    console.log('******************');


    //below is a promise, which does the exact thing as it's callback counterpart above, it's just here to serve as an example
    // Message.find({}).populate('comments').exec()
    // .then(function(messages){
    //   // console.log(".........");
    //   // console.log(messages);
    //   // console.log(".........");
    //   res.render("index", {messages: messages});
    // })
    // .catch(function(err){
    //   if (err){ console.log("error: ", err);}
    // }) // end of promise


    //IMPORTANT Note: Last note, notice how I use .populate() in the queries above. This method allows you to query the Message model and includes the comment records associated with it. Basically, as I stated in the comments with the Schemas above, the Message model saves the comments in an array via their _id. So, if I query a message record without .populate() it looks like:
    // ******************** message record below *****************
    // { _id: 582287fb07bd820e28e14d23,
    // updatedAt: 2017-09-19T16:37:25.768Z,
    // createdAt: 2016-11-09T02:20:43.927Z,
    // name: 'Jerrod',
    // message: 'First message, hooray!',
    // __v: 3,
    // comments:
    //  [ 582334ecaa2f0e1f1b8cb76d,
    //    58233524aa2f0e1f1b8cb76e,
    //    59c147c5d8c0c018b1194985 ] }
    //********************* end of message record *****************
    //Without the .populate method, you only have access to the _id of the comments that it is associated with, and would need another query for the actual comments itself. But, when I include .populate(), it actually replaces those _ids with the actual instance/record/object, so we can access them directly with only one query, see below:
    // ******************** message record below with .populate used *****************
    // { _id: 582287fb07bd820e28e14d23,
    // updatedAt: 2017-09-19T16:37:25.768Z,
    // createdAt: 2016-11-09T02:20:43.927Z,
    // name: 'Jerrod',
    // message: 'First message, hooray!',
    // __v: 3,
    // comments: [ [Object], [Object], [Object] ] },
    //********************* end of message record *****************
    // So, when you use .populate() in a basic form like this, you put in parenthesis, the name of the column you want included, so we put "comments", the name of the column. There are more complicated uses of .populate() and you can include more than one column/model with a single .populate()

    res.render("index", {messages: results});
  })
})


// ************* END OF PROMISE/CALLBACK/POPULATE EXAMPLE, other routes below ******************


//Below are the rest of the routes, I will include the promise versions of the callbacks, but commented out, just to serve as examples








app.post('/message', function(req, res){
  var message = new Message(req.body)
  message.save(function(error){
    if(error){
      Message.find({}).populate('comments').exec(function(err, results){
        if(err){console.log(err)}
        res.render("index", {messages: results, err: error}); //this would have to changed in full mean, as it loads the inital page with all the right info, but we're still in the "post" route of "/message", which you shouldn't stay in.
      })
    } else{
      res.redirect('/')
    }
  })
  //Below is the promise version of save, as an example, note that .save() like .exec() automatically returns a promise. So, I don't need to use a .exec() for it, I can chain a .then() directly off of it.

  //**********PROMISE EXAMPLE BELOW
  // var message = new Message(req.body)
  // message.save()
  // .then(function(){
  //   return Message.find({}).populate('comments').exec()
  // // The return line above is a simple way of executing a query inside of a .then() and returning it. If I wanted to return anything else, or also return the data that this .then() started with (nothing in this case), I would create a nested .then() and chain it off of the .exec(), since it's within the scope of the first .then() it would have access to the data it started with. Always remember, that queries and .exec() is asynchronous, so if I didn't chain a .then() (which waits for the .exec() to finish) after it, then anything I put after the .exec() wouldn't actually have access to it, but a "promise" instead, which would be undefined until the .exec() finishes.
  // })
  // .then(function(messages){
  //   res.redirect('/')
  // })
  // .catch(function(err){
  //   if(err){
  //     var results = Message.find({}).populate('comments').exec()
  //     .then(function(results){ //notice I use a .then() within a .catch(), this is so I have access to the .exec() query. If the res.render wasn't in a .then(), then the results variable would be equal to a "promise", which is undefined until the .exec() finishes. But the .exec() is asynchronous, meaning it breaks the normal workflow and code written after it actually gets executed before it.
  //       console.log("error at save:", err);
  //       res.render("index", {messages: results, err: err}); //this line would have to changed, as it loads the inital page with all the right info, but we're still in the "post" route of "/message", which you shouldn't stay in.
  //     })
  //   }
  // })
  //********** END OF PROMISE EXAMPLE

})

//this is a create route for comments, I have to first find the message it is related to, so that I can add the new comment to the comments array for that message record, so that they are linked and I can query this comment through the message later.
app.post('/comment/:id', function(req, res){
  //callback and working version below
  Message.findOne({_id: req.params.id}, function(err, result){
    var comment = new Comment(req.body);
    comment._message = result._id;
    comment.save(function(err){
      if(err){
        console.log("There was an error creating the comment");
        res.redirect('/')
      }
      result.comments.push(comment);
      result.save(function(error){
        if(error){
          console.log('There was an error saving the message with the new comment')
        }
        res.redirect('/')
      })
    })
  })
  //**********PROMISE EXAMPLE BELOW
  // var comment = new Comment(req.body)
  // Message.findOne({_id: req.params.id}).exec()
  // .then(function(message){
  //   comment._message = message._id
  //   return comment.save() //You should always return a .save() and end the .then() there, or you will wind up with "Unhandled Promise Rejection" errors and your .catch() won't work properly, if your validations or some other reason caused the .save()
  // })
  // .then(function(comment){
  //   return Message.findOne({_id: req.params.id}).exec()
  //   .then(function(message){ //a .then() nested within a .then()
  //     return [message, comment]
  //   })
  // })
  // .then(function(data){
  //   var message = data[0]
  //   var comment = data[1]
  //   message.comments.push(comment)
  //   return message.save()
  // })
  // .then(function(){
  //   res.redirect('/')
  // })
  // .catch(function(err){
  //   if(err){
  //     console.log("************");
  //     console.log("Error: ", err);
  //     res.redirect('/')
  //   }
  // })
  //********** END OF PROMISE EXAMPLE
})
