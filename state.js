var mongoose = require('mongoose');
var schema = mongoose.Schema;

var stateSchema = new schema({
	name: {type:String,required:true,unique:true},
	image: {type:String,required:true}
}, {collection:'states'});

var State = mongoose.model('State',stateSchema);
module.exports = State;