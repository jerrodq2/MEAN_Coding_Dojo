const mongoose = require('mongoose'),
      User = mongoose.model('User')


//notice below, the 'req.payload' is the vision/hapi version of expresses 'req.body'
module.exports = {
  create: (req, reply) => {
    var user = new User(req.payload)
    user.save()
    .then( () =>{
      reply.redirect('/finished')
    })
    .catch( (err) =>{
      console.log("There was an error! *********");
      console.log(err);
      reply.view('error.ejs', {error: err})
    })

  },//end of create


  finished: (req, reply) => {
    reply.view('finished.ejs')
  },



  show: (req, reply) => {
    User.find({}).exec()
    .then( (users) =>{
      console.log('************');
      console.log(users);
      reply.view('show.ejs', {users: users})
    })
  }





} //end of exports
