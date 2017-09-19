var express = require('express'),
    app = express(),
    path = require('path'),
    server = app.listen(5000)

app.use(express.static(path.join(__dirname + '/client')));
app.use(express.static(path.join(__dirname + '/bower_components')));
