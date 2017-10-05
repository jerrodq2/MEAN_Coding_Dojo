var express = require('express'),
    app = express(),
    path = require('path'),
    bodyParser = require('body-parser')
    session = require('express-session')
    MongoStore = require('connect-mongo')(session)

    app.use(session({
      secret: 'discussing_secrets is fun..!',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({url: 'mongodb://localhost/discussion_board_3'})
    }))



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './client')));
app.use(express.static(path.join(__dirname, './bower_components')));


require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);


var port = 8000
app.listen(port, function(){
  console.log('Server listening on port: ' + port);
})
