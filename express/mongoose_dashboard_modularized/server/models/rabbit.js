var mongoose = require('mongoose');

var RabbitSchema = new mongoose.Schema({
 name: String,
 age: Number,
 color: String
})
var Rabbit = mongoose.model('Rabbit', RabbitSchema); // We are setting this Schema in our Models as 'User'
