const Hapi = require('hapi'), //npm install --save hapi
  path = require('path')


//the below is the happy.js version of "var app = express()", we use path to include the client folder directory in the root project directory. However, if we're using the 'vision' plugin, the connections part is useless, since we still have to specify the file path in routes.js
const server = new Hapi.Server({
  connections: {
    routes: {
      files: {relativeTo: path.join(__dirname, 'client')}
    }
  }
});

//add connection
server.connection({
  port: 8000,
  host: 'localhost'
})


//mongoose file below
require('./server/config/mongoose.js');
//routes below
require('./server/config/routes.js')(server);






//start server
server.start(function(err){
  if(err){
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
})
