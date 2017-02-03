var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	passportLocalMongoose = require('passport-local-mongoose');
var User = new Schema({
	radio1: Number,
	ready: Boolean,
	partner: String
});
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);