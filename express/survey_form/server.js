//******* ALL 4 VARIABLES BELOW ARE USED IN FULL MEAN ******
//see the bottom of the file for what a full mean server.js file looks like
var express = require("express");
// This requies express.js which is a framework built ontop of node.js, so we need ot require it in order to use it, and we just tie it to a varible
var app = express();
// creates an express application, express() is a top-level function exported by the express module.
var path = require("path");
// the path module provides utilities for working with file and directory paths. We use this in the below app.use for static. It's also used in the './views' line, but that line isn't used in full mean
var bodyParser = require('body-parser');
// this is node.js middleware which allows you to parse incoming request bodies, this is what gives us the req.body or request.body, very important.


// ***** TWO LINES BELOW ARE IN FULL MEAN *****
app.use(bodyParser.urlencoded({ extended: true }));
// The body.parser...extended: line is used to tell the system how to handle nested objects and parsing the data sent over from the view. basically, we are sent over this very complex and big object with a lot of nested objects. So we set "extended:" to true, so that it uses complex algorithms for deep parsing that can deal with nested objects. If it was set to false, it would use a simple algorithm for shallow parsing, always have it set to true

// app.use(bodyParser.json());
// the above line "bodyParser.json()" isn't used in this project, but it is in full MEAN so I included it here so I could explain it and urlencoded at the same time. This basically tells the system that you want json to be used, or allows json to be parsed, this only comes into play during full mean later

app.use(express.static(path.join(__dirname, "./static")));
// express.static(root, [options]) is the only built-in middleware function in express, it serves static files. We specify the root with "__dirname",  which is just the directory of the current module, so we tell it that the root directory is the project directory. The options then tell it where to go from there, so just down one directory into the static folder.



// ***** TWO LINES BELOW ARE NOT IN FULL MEAN *****
app.set('views', path.join(__dirname, './views')); //this line isn't used in full mean
// The above line tells express where the views/templates are located, it's not used in full mean
app.set('view engine', 'ejs'); //this line isn't used in full mean
// the above line sets 'ejs' as the template engine, so that it knows how to render the views, it's not used in full mean



// BELOW GET AND POST WOULDN'T BE USED IN FULL MEAN AS IT IS, this is only while we're just using express and node. HOWEVER, "app.get('/route_here', function(req, res){})" and "app.post('/route_here', function(req, res){})" are used in full mean, but it is moved to the routes.js file in /server/config, and it incorporates the server controller to take the place of the functions, more on that later.



// The things you see below are how we specify routes, we type "app." which is the express app/framework, followed by the action (get, post, etc.), then open parenthesis, and the first paramter is the route, and the second one is a function that takes a reqeust and response as two paramaters (req and res)
app.get('/', function(request, response) {
 response.render("index"); //see the res.render() for the app.post for an explanation on it.
})
app.post('/result', function(req, res){
  // console.log(req)
  // console.log("*******************")
  // console.log("*******************")
  // console.log("*******************")
  // console.log("*******************")
  // console.log("*******************")
  // console.log(res)

  // req and rew in function stand for request, and response (server response actually). Both, especially req, are very long and contain a lot of info you don't care about. What's important in req is it's body or req.body, which contains the form info sent over. You can uncomment the above console.logs to see examples of them

  // More recent comment: req.body is an object, and can be changed, unlike the immutable dictionaries that were sent over from python. it looks like:
  // { name: 'Jerrod',
  //   location: 'Dallas',
  //   language: 'python',
  //   comment: 'eh' }

  // This is just for pratice and to remind me, but req.body is the same as request.form, so r is equal to an immutable dictionary with all the form data, but can be changed.


  res.render('result', {user: req.body})
  // res is the same response/res from function in the app.post. Here, we tell it to render the template named 'result' or techinically, result.ejs, then we apps it whatever info we want to be able to use in an javascript object format, so we tied the request.body to the key "user". In the view, I access teh name with "user.name", I could just as easy tie each value in req.body to a key, for example put {name: req.body.name}, then in the view, I would just type "name" to access it. Both way swork

})

app.listen(5000);
// Here you tell express which port to run on in localhost, you can make it whatever you want, but avoid 80. So, to see this project, I have to go to http://localhost:5000/



// The below code is for a full mean, single page app, it could look different based on each project, for example, the line 28 "app.set('view engine', 'ejs');" would be used if you wanted actual pages and not partials loaded, besides the index.html
// ******************** BELOW IS WHAT A FULL MEAN SERVER.JS FILE LOOKS LIKE *******************


// var express = require('express'),
//     app = express(),
//     path = require('path'),
//     bodyParser = require('body-parser')

// app.use(bodyParser.urlencoded({extended: true}))
// app.use(bodyParser.json())
// app.use(express.static(path.join(__dirname, './client')))
// app.use(express.static(path.join(__dirname, './bower_components')))


// require('./server/config/mongoose.js')
// require('./server/config/routes.js')(app)


// server = app.listen(8000)

// ******************************** SERVER.JS EXAMPLE END *****************************
