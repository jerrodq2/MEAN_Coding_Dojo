const User = require('../serverControllers/users.js')

module.exports = function(server){

  //Below, we use the 'vision' plugin in order to use ejs files, otherwise, inert is fine for a traditional single page app

  server.register(require('vision'), function(err){
    if(err){
      console.log("Couldn't use vision plugin due to error: ");
      console.log(err);
    }

    //this allows the use of ejs, or whichever template you want to use. We have to specify the folder that the templates will reside in, in this case the 'client' folder
    server.views({
        engines: { ejs: require('ejs') },
        relativeTo: __dirname,
        path: '../../client'
    });

    //this route shows how you can load a template/view and send data to it as an object
    server.route({
      method: 'GET',
      path: '/test',
      handler: (request, reply) => {
        reply.view('test.ejs', {name: "Just showing how you can send dynamic content to the views"})
      }
    })

    server.route({
      method: 'GET',
      path: '/users/new',
      handler: (req, reply) => {
        reply.view('create.ejs')
      }
    })

    //The rest of the routes will use the controller to be more modularized
    server.route({
      method: 'POST',
      path: '/users',
      handler: User.create
    })

    server.route({
      method: 'GET',
      path: '/finished',
      handler: User.finished
    })

    server.route({
      method: 'GET',
      path: '/users',
      handler: User.show
    })


  })//end of vision










  //*******************************************************************************************
  //The below code demonstrates the use of the 'inert' plugin as opposed to the vision one above, vision is used to serve templates such as ejs, for a single page app, use inert

  //npm install --save inert, this plugin is used to provide new handler methods for serving static files and directories as well as decorating the reply interface with a file method for serving file based resources
  /*
  server.register(require('inert'), function(err){
    if(err){
      throw err;
    }

    server.route({
      method: 'GET',
      path: '/',
      handler: function(request, reply){
        reply.file("index.html")
      }
    })
    server.route({
      method: 'GET',
      path: '/user/{name}',
      handler: (request, reply) => {
        //by using encodeURIComponent() we URI encode the name parameter to prevent injection attacks
        reply("<h1>Hello, " + encodeURIComponent(request.params.name) + "</h1>")
      }
    })
  })//end of inert
  */







}//END
