
var rabbits = require('../controllers/rabbits.js');

module.exports = function(app){
  app.get('/', function(req, res) {
    rabbits.findAll(req, res);
  })
  app.get('/mongooses/new', function(req, res){
    res.render('new.ejs')
  })
  app.post('/mongooses', function(req, res){
    rabbits.create(req, res);
  })
  app.get('/mongooses/:id/destroy', function(req, res){
    rabbits.destroy(req, res);
  })
  app.get('/mongooses/:id', function(req, res){
    rabbits.findOne(req, res);
  })
  app.get('/mongooses/:id/edit', function(req, res){
    rabbits.findForEdit(req, res);
  })
  app.post('/mongooses/:id', function(req, res){
    rabbits.update(req, res);
  })
}
