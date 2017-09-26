var express = require('express'),
    app = express(),
    path = require('path'),
    server = app.listen(5000)

app.use(express.static(path.join(__dirname + '/client')));
app.use(express.static(path.join(__dirname + '/bower_components')));
//the two above lines are important and used in full mean. The "path.join()" part basically includes them in the directory we're currently in, the root directory. So, in index.html, you'll notice I include two angular files, both are within the bower_components folder, normally I'd have to specify the file like so: "bower_components/angular/angular.js", but instead, I do this: "angular/angular.js", this is because of the above lines. I include the files/folders in the bower_components folder and in the client folder with the root directy, so as far as node is concerned,index.html within the client folder is in the root directory, not the client folder. 
