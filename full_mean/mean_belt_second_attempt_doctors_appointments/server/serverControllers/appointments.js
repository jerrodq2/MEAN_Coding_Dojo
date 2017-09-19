var mongoose = require('mongoose')
var App = mongoose.model('Appointment')

module.exports = {
  findAll: function(req, res){
    App.find({}, function(err, results){
      res.json(results)
    })
  },
  findOne: function(req, res){
    App.findOne({_id: req.params.id}, function(err, result){
      console.log(result);
      if(err){
        console.log('That id is not stored in the database')
      } else{
        res.json(result)
      }
    })
  },
  create: function(req, res){
    // Below is 2 validations before the actual inserting into the db. The first checks if there are more than 3 appointments on that day, which we don't want to go past, the second, is if the user already has an appointment on that day, he shouldn't have more than 1 per day, if both of those pass, then we save
    App.find({}, function(err, all){
      var test = true
      var count = 0;
      for (var i = 0; i < all.length; i++){
        if(req.body.date.slice(0,10) == all[i].date.toISOString().slice(0,10)){
          count++
          if(count >= 3){
            test = false
            res.json({message: false, str: 'There are already 3 appointments on that day, please pick another date'})
            break
          }
        }
      }
      //end of the for loop and first check
      if(test){
        // If they've gotten this far, there isn't more than 3 appointments for the date they want, next we check if the user already has an appointment on that day
        App.find({userId: req.body.userId}, function(err, userApps){
          for(var x = 0; x < userApps.length; x++){
            if(req.body.date.slice(0,10) == userApps[x].date.toISOString().slice(0,10)){
              test = false
              res.json({message: false, str: 'You alredy have an appointment on that day, please pick another date'})
              break
            }
          }
          //end of this for loop and the second appointment per day check

          if(test){
            // If they got here, then both of the above checks are good and we can insert into the db, sorry for so many if statements and the ugliness of the code.
            var app = new App(req.body)
            app.save(function(err){
              if(err){
                res.json({message: false, str: 'There was an error'})
              } else{
                res.json({message: true})
              }
            })
          }
        })
      }
    })
  },
  update: function(req, res){
    // Below is 2 validations before the actual inserting into the db, and a server side validation to ensure it is the actual user tying to update the appointment. The first checks if there are more than 3 appointments on that day, which we don't want to go past, the second, is if the user already has an appointment on that day, he shouldn't have more than 1 per day, if both of those pass, then we save
  App.find({}, function(err, all){
    var test = true
    var count = 0;
    for (var i = 0; i < all.length; i++){
      if(req.body.date.slice(0,10) == all[i].date.toISOString().slice(0,10)){
        count++
        if(count >= 3){
          test = false
          res.json({message: false, str: 'There are already 3 appointments on that day, please pick another date'})
          break
        }
      }
    }
    //end of the for loop and first check
    if(test){
      // If they've gotten this far, there isn't more than 3 appointments for the date they want, next we check if the user already has an appointment on that day
      App.find({userId: req.body.checkId}, function(err, userApps){
        var secondCount = 0; //this variable is because they could be trying to update an appointment whithout changint the day, inwhich case, according to the db, they already have an appointment on that day.
        for(var x = 0; x < userApps.length; x++){
          if(req.body.date.slice(0,10) == userApps[x].date.toISOString().slice(0,10)){
            secondCount++
            if(secondCount >= 2){test = false
            res.json({message: false, str: 'You alredy have an appointment on that day, please pick another date'})
            break}
          }
        }
        //end of this for loop and the second appointment per day check
        if(test){
          // If they got here, then both of the above checks are good and we can insert into the db, sorry for so many if statements and the ugliness of the code.
          // But first I do server side validation to make sure the client side wasn't tampered with, and this is the correct user before I update it
          App.findOne({_id: req.body.aid}, function(err, result){
            if(err){
              console.log('That appointment id is incorrect')
            } else{
              if(result.userId == req.body.checkId){
                App.update({_id: req.body.aid}, {$set: req.body}, function(err){
                  if(err){
                    console.log('There was a problem')
                    res.json({message: false, str: 'there was an error'})
                  } else{
                    res.json({message: true})
                  }
                })
              } else{     //If they hit this, then the user Id send didn't match the one stored with the appointment and it won't update
                console.log('Nice try buddy');
              }
            }
          })
        }
      })
    }
  })
  },
  delete: function(req, res){
    App.findOne({_id: req.params.aid}, function(err, result){
      if(err){
        console.log('that appointment doesnt exist in the databse')
      } else{   //more server side validations
        if(result.userId == req.params.uid){
          App.remove({_id: req.params.aid}, function(err){
            if(err){
              console.log(err)
            }
          })
        } else{
          console.log('Nice try buddy')
        }
      }
    })
  },



}



// *******************End*******************
