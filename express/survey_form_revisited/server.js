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

var io = require('socket.io').listen(server)
io.sockets.on('connection', function (socket) {

    socket.on('posting_form', function (data) {
    //  EMIT:
    var answer = data
    var number = Math.floor(Math.random() * (1000 - 1 +1) + 1 )
    socket.emit('response', {answer, number});

  })

})
