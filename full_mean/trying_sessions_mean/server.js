//This file shows how to use sessions, first you need to install it with "npm install --save express-session" to use the sessions and "npm install --save connect-mongo" to save them in mongodb. connect-mongo allows you to store express sessions in mongoDB
var express = require('express'),
    app = express(),
    path = require('path'),
    bodyParser = require('body-parser')
    //We need to require the two lines below in order to use sessions through this method.
    session = require('express-session')
    MongoStore = require('connect-mongo')(session)


//the below line intializes the session and sets it up for use. The format is "app.use(session({code here...}))", so the "secret:" is a required option and used to sign the session ID cookie, this can either be a single string or an array of multiple secrets. "resave:" forces the session to be saved back to the session store, even if the session was never modified during the request. The default is true, typically you want it to be false. If "saveUninitialized:" is set to true, it forces a session that is uninitialized to be saved to the store. A session is uninitialized when it is new but not modified. Setting this to false is useful for implementing login sessions, reducing server storage usage, or complying with laws that require permission before setting a cookie.

//We create a new connection with mongoDB to stare the session with "store: new MongoStore( {url: '...'} )", usually I make the last part of the url the same as the database name in mongoose.js, anything after the "url" in the MongoStore object is advanced options, such as "ttl" or time to live. I explain ttl here, but I don't use it, I use another method in the server controller to determine how long the session will live. The ttl determines how long the session will live or persist in our database, once the determined amount of time has passes, the session is removed. This type of thing is what causes you to have to log back in after not signing in for a few days. If the user interacts with the server, the expiration date is refreshed. ttl is listed in seconds, basically it's saying 14 days times 24 hours times 60 minutes times 60 seconds. If we say changed it to "2 * 24 *60 * 60", then it would expire after 2 days exactly.
app.use(session({
  secret: 'testingoutsessions',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({url: 'mongodb://localhost/session_experiments',
                        // ttl: 14 * 24 * 60 * 60 (the code before this is an example of ttl)
                        })
}))


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, './client')))
app.use(express.static(path.join(__dirname, './bower_components')))


require('./server/config/mongoose.js')
require('./server/config/routes.js')(app)


server = app.listen(8000)


// *******************End*******************


// SOCKET STUFF BELOW

// var io = require('socket.io').listen(server)
// io.sockets.on('connection', function (socket) {
//   socket.on('button_clicked', function (data) {
//     //  EMIT:
//     socket.emit('my_emit_event');
//     //  BROADCAST:
//     socket.broadcast.emit("my_broadcast_event");
//     //  FULL BROADCAST:
//     io.emit("my_full_broadcast_event");
// })
//
// })
