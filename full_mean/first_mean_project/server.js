var express = require('express'),
    app = express(),
    path = require('path'),
    bodyParser = require('body-parser'),
    server = app.listen(5000)
    // Schema = mongoose.Schema;
// mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended: true}));
app.use( bodyParser.json() );

app.use(express.static('client'));
app.use(express.static('bower_components'));



require('./server/config/mongoose.js');

require('./server/config/routes.js')(app)
// Since require('.....') is a function, I just automatically call it
