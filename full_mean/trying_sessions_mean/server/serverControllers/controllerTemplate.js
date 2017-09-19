var mongoose = require('mongoose')
var ExampleModel = mongoose.model('ExampleModel')

module.exports = {


}



// *******************End*******************


// RESTFUL/CRUD METHODS BELOW

// index: function(req, res){
//   User.find({}, function(err, results){
//     res.json(results);
//   });
// },
// show: function(req, res){
//   User.findOne({_id: req.params.id}, function(err, result){
//     res.json(result);
//   })
// },
// create: function(req, res){
//   var user = new User(req.body);
//   user.save(function(err){
//     if(err){
//       res.json({message: false});
//     } else{
//       res.json({message: true});
//     }
//   })
// },
// delete: function(req, res){
//   User.remove({_id: req.params.id}, function(err){
//     if(err){
//       res.json({message: false});
//     } else{
//       res.json({message: true});
//     }
//   })
// },
// update: function(req, res){
//   User.update({_id: req.params.id}, function(err){
//     if(err){
//       res.json({message: false});
//     } else{
//       res.json({message: true});
//     }
//   })
// },
