var mongoose = require('mongoose'),
    User = mongoose.model('User');


function UsersController() {
    this.index = function(req, res) {
        User.find({}, function(err, data) {
            res.json(data);
        });
    };
}

module.exports = new UsersController();
