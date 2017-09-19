var express = require('express'),
    app = express(),
    path = require('path'),
    bodyParser = require('body-parser'),
    server = app.listen(5000);

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + './client/static'));
app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');

require('./server/config/mongoose.js');


var routes_setter = require('./server/config/routes.js');

routes_setter(app);
