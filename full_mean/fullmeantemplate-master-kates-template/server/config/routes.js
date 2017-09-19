var Users = require('../controllers/users.js');

module.exports = (function(app){
  app.get('/users', Users.index);
});
