var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = new schema({
	username : {type:String },
	password : {type:String },
	avatar : {type:String},
	favorites : [],
	purchases : []
}, {collection:'users'});

var User = mongoose.model('User',userSchema);
module.exports = User;