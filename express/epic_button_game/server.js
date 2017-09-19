var express = require('express');
var app = express();
var path = require('path')

app.use(express.static(__dirname + '/static'));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
 res.render("index");
})



var server = app.listen(5000);
var count = 0;
  // count is just creating the variable so i can access it globally
var io = require('socket.io').listen(server)
io.sockets.on('connection', function (socket) {
  io.emit('server_response', count);
    // Since I wanted anyone to see the count when they logged on, I have it to send this server response when anyone connects, so on the html side, the count will be automatically added to the page
  socket.on('button_clicked', function () {
    //  FULL BROADCAST:
      // so when anyone clicks, the count goes up by one, and since below, it says io.emit, it's ent to everyone
    count += 1;
    io.emit("server_response", count);
  })
  socket.on('reset', function(){
    count = 0;
    io.emit('server_response',count)
  })

})
