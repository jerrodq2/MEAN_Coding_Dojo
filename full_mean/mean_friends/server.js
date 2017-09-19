var express = require('express'),
    app = express(),
    path = require('path'),
    bodyParser = require('body-parser')
    // Schema = mongoose.Schema;
// mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, './client')));
app.use(express.static(path.join(__dirname, './bower_components')));


require('./server/config/mongoose.js');
require('./server/config/routes.js')(app)

server = app.listen(5000)
