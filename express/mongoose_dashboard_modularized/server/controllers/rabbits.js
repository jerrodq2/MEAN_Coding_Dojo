var mongoose = require('mongoose');
var Rabbit = mongoose.model('Rabbit');

module.exports = {
  findAll: function(req, res){
    Rabbit.find({}, function(err, results){
      res.render("index", {rabbits: results});
    })
  },

  create: function(req, res){
    var rabbit = new Rabbit(req.body)
    rabbit.save(function(err){
      if(err){
        console.log('There was an error');
      } else {
        console.log('Successfull addition');
      }
    })
    res.redirect('/');
  },

  destroy: function(req, res){
    Rabbit.remove({_id: req.params.id}, function(err){
      if(err){
        console.log('Failed');
      } else{
        console.log('Success!');
      }
    })
    res.redirect('/');
  },

  findOne: function(req, res){
    Rabbit.find({_id: req.params.id}, function(err, rabbit){
      res.render('show.ejs', {rabbit: rabbit[0], id: req.params.id})
    })
  },

  findForEdit: function(req, res){
    Rabbit.find({_id: req.params.id}, function(err, rabbit){
      if(err){console.log(err)}
      res.render('edit.ejs', {rabbit: rabbit[0]});
    })
  },
  
  update: function(req, res){
    var r = req.body
    Rabbit.update({_id: req.params.id},{$set: req.body}, function(err){
      if(err){
        console.log("Didn't update");
      } else{
        console.log('SUCCESS!');
      }
      res.redirect('/');
    })
  }
}
