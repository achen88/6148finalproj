var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	passportLocalMongoose = require('passport-local-mongoose');
var User = new Schema({
	radio1: Number
});
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);