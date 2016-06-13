var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = new schema({
	username : {type:String required:true},
	password : {type:String required:true},
	avatar : {type:String},
	favorites : [],
	purchases : []
}, {collection:'users'});

var User = mongoose.model('User',userSchema);
module.exports = User;