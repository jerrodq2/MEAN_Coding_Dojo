var mongoose = require('mongoose')
var Schema = mongoose.Schema; //used in associations when specifying the type

var TopicSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true,
    minlength: 4,
  },
  description:{
    type: String,
    Required: true,
    maxlength: 50
  },
  category:{
    type: String,
    Required: true,
  },
  user_id:{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]

}, {timestamps: true})


TopicSchema.pre('remove', function(next){ //a model method that deletes any comments associated with a topic, before the actual topic is deleted
  this.model('Comment').find({topic_id:this._id}).exec()
  .then(function(comments){
    for(var i = 0; i < comments.length; i++){
      comments[i].remove()
    }
    next() //This ends the .pre()
  })
})



mongoose.model('Topic', TopicSchema)


// *******************End*******************
