var express = require('express'),
    app = express(),
    path = require('path'),
    bodyParser = require('body-parser'),
    server = app.listen(5000);

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + './client/static'));
app.set('views', path.join(__dirname, './client/views'));
//this line above, with the "path.join()", basically includes the specified folders in the same directory as your server.js file. In order words, it goe sinto the client folder, then the views folder and makes those files available from the root directory of your app. So, in this server.js file, I could point to them without having to go through the client and views folder first while node is running. 

app.set('view engine', 'ejs');

require('./server/config/mongoose.js');


var routes_setter = require('./server/config/routes.js');

routes_setter(app);
