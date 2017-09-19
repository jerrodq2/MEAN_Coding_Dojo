var express = require('express'),
    path = require('path'),
    app = express(),
    bodyParser = require('body-parser')
    // Schema = mongoose.Schema;
// mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './client')));
app.use(express.static(path.join(__dirname, './bower_components')));

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);


server = app.listen(8000)
