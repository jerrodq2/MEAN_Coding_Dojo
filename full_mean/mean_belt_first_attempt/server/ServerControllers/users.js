var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {
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
  register: function(req, res){
    var user = new User(req.body);
    user.save(function(err){
      if(err){
        res.json({message: false});
      } else{
        res.json({message: true, id: user._id, first_name: user.first_name, last_name: user.last_name});
      }
    })
  },
  login: function(req, res){
    User.findOne({email:req.body.email}, function(err, user){
      if(err){
        res.json({message: false});
      } else if(!user){
        res.json({message: false});
      } else {
        var check = user.validPassword(req.body.password)
        if(check){
          console.log('good login');
          res.json({message: true, id: user._id, first_name: user.first_name, last_name: user.last_name});
        } else{
          console.log('unsuccessful login');
          res.json({message: false});
        }
      }
    })
  },
}
