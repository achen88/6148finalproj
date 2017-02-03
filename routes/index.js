var express = require('express');
var passport = require('passport');
var User = require('../schemas/user.js');
var router = express.Router();

function roomname(from, to) {
  if(from < to) {
    return from.concat('-').concat(to);
  }
  return to.concat('-').concat(from);
}

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.isAuthenticated()) {
		res.redirect('/chatroom');
	}
	else {
		res.render('index');
	}
});

router.get('/login', function(req, res, next) {
	if(req.isAuthenticated()) {
		res.redirect('/user/:username');
	}
	else {
		res.render('login');
	}
});

router.get('/signup', function(req, res, next) {
	res.render('signup', {});
});

router.get('/chatroom', function(req, res, next) {
	if(req.isAuthenticated()) {
		User.find({username: req.user.username}, function(err, users) {
			if(users[0].partner != null) {
				res.render('chatroom', {connected: true, room: roomname(req.user.username, req.user.partner), user: req.user.username, partner: req.user.partner});
			}
			else {
				res.render('chatroom', {connected: false});
				console.log('fail');
			}
		});
	}
	else {
		res.redirect('/login');
	}
});

router.get('/user/:username', function(req, res, next) {
	var user = req.user;
});

router.get('/connect', function(req, res, next) {
	console.log(req.user.username);
	var username = req.user.username;
	var support = req.user.radio1;
	var other_user = "";
	User.update({username: username}, {$set: {ready: true}}, {}, function(){});

	//console.log(support);
	support = (support+1)%2;
	//console.log(support);

	User.find({ready: true, radio1: support}, function(err, users) {
		console.log(users);
		//console.log(users.length);
		//console.log(support);
		if(users.length == 0) {
			setTimeout(function() {
				res.redirect('/connect');
			}, 3000);
		}
		else {
			console.log("FOUND");
			other_user = users[0].username;
			User.update({username: other_user}, {$set: {parter: username}}, {}, function(){});
			User.update({username: username}, {$set: {partner: other_user}}, {}, function(){});
			var room = roomname(username, other_user);
			console.log(other_user);
			console.log(room);
			setTimeout(function() {
				res.redirect('/chatroom');
			}, 3000);
			//res.render('chatroom', {connected: true, room: room});
		}
	});
});

router.post('/login',
	passport.authenticate('local', { successRedirect: '/chatroom',
		failureRedirect: '/login',
		failureFlash: true })
	);

router.post('/signup', function (req, res, next) {
	console.log('signed up');
	console.log(req.body);
	var user = new User({username: req.body.username, radio1: req.body.radio1, ready: false, partner: null});
	User.register(user, req.body.password, function(registrationError) {
		if(!registrationError) {
			req.login(user, function(loginError) {
				if (loginError) { return next(loginError); }
				return res.redirect('/chatroom');
			});
		} else {
			res.render('error', registrationError);
		}
	});
});

module.exports = router;