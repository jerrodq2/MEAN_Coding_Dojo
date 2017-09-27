var express = require('express'),
    app = express(),
    path = require('path'),
    bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './client')));
app.use(express.static(path.join(__dirname, './bower_components')));


require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);


server = app.listen(8000)




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
