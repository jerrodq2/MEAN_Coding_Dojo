var mongoose = require('mongoose');
var Friend = mongoose.model('Friend');
 // Ex: var Quote = mongoose.model('Quote');

module.exports = {
  find: function(req, res){
    Friend.find({}, function(err, results){
      res.json(results);
    });
  },
  findOne: function(req, res){
    Friend.findOne({_id: req.params.id}, function(err, result){
      if(err){console.log(err)};
      res.json(result)
    })
  },
  update: function(req, res){
    Friend.update({_id: req.params.id}, { $set: req.body}, function(err){
      if(err){console.log(err)
      } else {
        console.log('good')
      }
    })
  },
  create: function(req, res){
    var friend = new Friend(req.body);
    friend.save(function(err){
      if(err){console.log('something went wrong')}
        res.json(err);
    })
  },
  delete: function(req, res){
    Friend.remove({_id: req.params.id}, function(err){
      if(err){console.log(err)}
    })
  }
}
