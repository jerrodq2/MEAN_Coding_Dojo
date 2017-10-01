var express = require('express');
var path = require('path')
var app = express();

app.use(express.static(__dirname + '/static'));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
 res.render("index");
})



var server = app.listen(5000);

var io = require('socket.io').listen(server)
io.sockets.on('connection', function (socket) {
  console.log("WE ARE USING SOCKETS!");
  console.log(socket.id);

  socket.on("button_clicked", function (data){
    console.log('Someone clicked a button!  Reason: ' + data.reason);
    socket.emit('server_response', {response: "sockets are the best!"});
  })

})

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
