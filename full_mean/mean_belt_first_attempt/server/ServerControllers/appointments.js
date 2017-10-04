var mongoose = require('mongoose');
var App = mongoose.model('Appointment');

module.exports = {
  create: function(req, res){
    var test = false;
    App.find({}, function(err, all){
      // this entire first find is to see if that day already has 3 appointments on it
      var count = 0;
      for(var x = 0; x < all.length; x++){
        if(req.body.date.slice(0,10) == all[x].date.toISOString().slice(0,10)){
          count ++;
        }
      }
      if (count >= 3){
        test = true;
        res.json({message: false, str: 'This day already has 3 appointments on it, please choose another day'})
      }
      if(test == false){
        App.find({userId: req.body.userId},function(err, results){
          // this find is to see if the user already has an appointment on that day
          if(err){
            console.log('strange error');
          } else {
            for(var i = 0; i < results.length; i++){
              if(req.body.date.slice(0,10) == results[i].date.toISOString().slice(0,10)){
                test = true;
                res.json({message: false, str: 'You already have an appointment on that day, limit of 1 appointment per day.'});
              }
            }
          }
          if(test == false){
            var app = new App(req.body);
            app.save(function(err){
              if(err){
                res.json({message: false});
                console.log('failed');
              } else{
                res.json({message: true})
                console.log('success');
              }
            })
          }
        })
      }
    })

  },
  index: function(req, res){
    App.find({}, function(err, results){
      res.json(results);
    })
  },
  delete: function(req, res){
    App.findOne({_id: req.body.appId}, function(err, result){
      if(result.userId == req.body.userId){
        App.remove({_id: req.body.appId}, function(err){
          res.json({message: true});
        })
      } else{
        console.log('wrong User Id');
        res.json({message: false})
      }
    })
  },



// *************************** EXAMPLE OF ROUTE PARAMETERS BELOW ***************************

  //Notice below I do "req.params.id", this is how you access a route paramter in the server side. You use the first parameter below, usually "request" or "req", then ".params.param_name", so in this case, since I want to access the :id paramaeter in the url, I do "req.params.id"
  edit: function(req, res){
    App.findOne({_id: req.params.id}, function(err, result){
      res.json(result);
    })
  },




  update: function(req, res){
    //first i'm checking to see if the user id in the cookie matches the one with said appointment, so that if they tamper with the client side, they can't start deleting and editing whatever they want, I have a similar check on delete
    if(req.body.complain.length < 10 || req.body.complain.length > 40){
      res.json({message: false});
    } else {
      console.log('hi');
      App.findOne({_id: req.body.aid}, function(err, result){
        if(result.userId != req.body.check){
          res.json({message: false})
        } else{
          App.update({_id: result._id}, {$set: req.body}, function(err){
            if (err){
              res.json({message: false});
            } else{
              console.log('success');
              res.json({message: true});
            }
          })
        }
      })
    }
  },


}
