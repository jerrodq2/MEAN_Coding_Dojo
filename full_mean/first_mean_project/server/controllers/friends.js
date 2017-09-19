var mongoose = require('mongoose');
var Friend = mongoose.model('Friend');
 // Ex: var Quote = mongoose.model('Quote');

 function FriendsController(){
   this.showAll = function(req,res){
     Friend.find({}, function(err, results){
       res.json(results);
     })
   };
   this.create = function(req,res){
     var friend = new Friend(req.body)
     friend.save(function(err, result){
       if (err){console.log(err)}
       res.json(result);
     })
   };
   this.update = function(req,res){
     Friend.update({_id: req.params.id},{$set: req.body}, function(err){
       if(err){console.log(err)}
       res.json({placeholder:'update'});
       })
   };
   this.delete = function(req,res){
     Friend.remove({_id: req.params.id}, function(err){
       if(err){console.log(err)}
       res.json({placeholder:'delete'});
     })
   };
   this.showOne = function(req,res){
     Friend.findOne({_id: req.params.id}, function(err, result){
       if (err){console.log(err)}
       res.json({placeholder:'show'});
     })
   };
 }
 module.exports = new FriendsController(); // what does this export?
