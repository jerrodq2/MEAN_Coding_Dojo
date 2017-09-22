var mongoose = require('mongoose');
var Rabbit = mongoose.model('Rabbit');

module.exports = {
  // Below, i've commented out several callback functions and replaced them with promises for practice
  findAll: function(req, res){
    Rabbit.find().exec()
    .then(function(rabbits){
      res.render("index", {rabbits: rabbits})
    })
    //callback below
    // Rabbit.find({}, function(err, results){
    //   res.render("index", {rabbits: results});
    // })
  },

  create: function(req, res){
    var rabbit = new Rabbit(req.body)
    rabbit.save()
    .then(function(){
      console.log('Successfull Addition');
      res.redirect('/')
    })
    .catch(function(err){
      console.log('There was an error...');
      res.redirect('/')
    })
    //callback below
    // var rabbit = new Rabbit(req.body)
    // rabbit.save(function(err){
    //   if(err){
    //     console.log('There was an error');
    //   } else {
    //     console.log('Successfull addition');
    //   }
    // })
    // res.redirect('/');
  },

  destroy: function(req, res){
    Rabbit.remove({_id: req.params.id}).exec()
    .then(function(){
      console.log('Success');
      res.redirect('/')
    })
    .catch(function(err){
      console.log("Failed...");
      res.redirect('/')
    })
    //callback below
    // Rabbit.remove({_id: req.params.id}, function(err){
    //   if(err){
    //     console.log('Failed');
    //   } else{
    //     console.log('Success!');
    //   }
    // })
    // res.redirect('/');
  },

  findOne: function(req, res){
    Rabbit.findOne({_id: req.params.id}).exec()
    .then(function(rabbit){
      res.render('show.ejs', {rabbit: rabbit, id: req.params.id})
    })
    .catch(function(err){
      console.log("There was an error in the findOne method");
      res.redirect('/')
    })
    //callback below
    // Rabbit.find({_id: req.params.id}, function(err, rabbit){
    //   res.render('show.ejs', {rabbit: rabbit[0], id: req.params.id})
    // })
  },

  findForEdit: function(req, res){
    Rabbit.findOne({_id: req.params.id}).exec()
    .then(function(rabbit){
      res.render('edit.ejs', {rabbit: rabbit})
    })
    .catch(function(err){
      console.log("There was an error in the findOne method");
      res.redirect('/')
    })
    //callback below
    // Rabbit.find({_id: req.params.id}, function(err, rabbit){
    //   if(err){console.log(err)}
    //   res.render('edit.ejs', {rabbit: rabbit[0]});
    // })
  },

  update: function(req, res){
    //In the promise version, I use save() instead of update() because validations don't get activated on an update, but they do on a save()
    Rabbit.findOne({_id: req.params.id}).exec()
    .then(function(rabbit){
      rabbit.name = req.body.name
      rabbit.age = req.body.age
      rabbit.color = req.body.color
      //I do the three above, because if I just did "rabbit = req.body.name", i'd lose the _id and _v columns, which causes the save() to fail. this process will have to be improved for more complicated models and updates
      return rabbit.save()
    })
    .then(function(){
      console.log('SUCCESS!!!');
      res.redirect('/')
    })
    .catch(function(err){
      console.log("Update failed!");
      res.redirect('/')
    })
    //callback below
    // var r = req.body
    // Rabbit.update({_id: req.params.id},{$set: req.body}, function(err){
    //   if(err){
    //     console.log("Didn't update");
    //   } else{
    //     console.log('SUCCESS!');
    //   }
    //   res.redirect('/');
    // })
  }


}
