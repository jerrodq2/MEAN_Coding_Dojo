var express = require('express'),
    app = express(),
    path = require('path'),
    bodyParser = require('body-parser')

    // session = require('express-session')     include this and the below line for session use
    // MongoStore = require('connect-mongo')(session)


    /* Include the below code block to use express sessions via mongoDB, just change the "NAME_HERE" part (usually I make this the same as the name of my database in mongoose.js), and the secret name, this can be whatever you want, it's used to sign the session ID cookie.
    app.use(session({
      secret: 'SECRET_NAME_HERE',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({url: 'mongodb://localhost/NAME_HERE'})
    }))
    */


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './client')));
app.use(express.static(path.join(__dirname, './bower_components')));

// app.set('views', path.join(__dirname, './client'));    include this and the below line if you're going to use other html pages besides index and your partials, they should be ".ejs" files
// app.set('view engine', 'ejs');

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);


var port = 8000
app.listen(port, function(){
  console.log('Server listening on port: ' + port);
})
