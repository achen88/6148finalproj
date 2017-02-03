var mongoose = require('mongoose');

var msgSchema = new mongoose.Schema({
	from: String,
	to: String,
	msg: String
});

var Message = mongoose.model('Message', msgSchema);

module.exports = Message;