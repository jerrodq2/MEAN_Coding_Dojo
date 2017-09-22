// IMPORTANT Note: The below code is similar to how a full mean mongoose.js file would look like, but not quite what I use. I use some regex to clean up the readdirSync line, and plug the actual path that mongoose connects to into a variable, so I can use it in multiple places. Lastly, I use several mongoose.connection.on() with console.log statements to make it easier to see what's going on. Meaning, if the db was to be disconnected, it would log a specific message to the terminal


var mongoose = require('mongoose');
// require the fs module for loading model files
var fs = require('fs');
// require path for getting the models path
var path = require('path');
// connect to mongoose!
mongoose.connect('mongodb://localhost/modularization');
// create a variable that points to the path where all of the models live
var models_path = path.join(__dirname, './../models');
// read all of the files in the models_path and require (run) each of the javascript files
fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf('.js') >= 0) {
    // require the file (this runs the model file which registers the schema)
    require(models_path + '/' + file);
  }
});
