var express = require('express');
var router = express.Router();

var User = require('../schemas/user');

/* GET users listing. */
router.get('/:user', function(req, res, next) {
  var user = req.params.user;
  res.render('users', {user: user});
});

module.exports = router;