var mongoose = require('mongoose')
var ExampleModel = mongoose.model('ExampleModel')

module.exports = {


}



// *******************End*******************

/********************* code for implementing sessions below **********************
req.session.user = {_id: user._id, first_name:user.first_name, last_name:user.last_name}

if (req.body.remembered) {
  req.session.cookie.expires = null
} else {
  req.session.cookie.maxAge = 60000 //This is milliseconds, equal to one minute, 1000 milliseconds equals one second
}

*/


// ********************* RESTFUL/CRUD METHODS BELOW ********************* 

/*

index: function(req, res){
  User.find({}, function(err, results){
    res.json(results);
  });
},
show: function(req, res){
  User.findOne({_id: req.params.id}, function(err, result){
    res.json(result);
  })
},
create: function(req, res){
  var user = new User(req.body);
  user.save(function(err){
    if(err){
      res.json({message: false});
    } else{
      res.json({message: true});
    }
  })
},
delete: function(req, res){
  User.remove({_id: req.params.id}, function(err){
    if(err){
      res.json({message: false});
    } else{
      res.json({message: true});
    }
  })
},
update: function(req, res){
  User.update({_id: req.params.id}, function(err){
    if(err){
      res.json({message: false});
    } else{
      res.json({message: true});
    }
  })
},

*/
