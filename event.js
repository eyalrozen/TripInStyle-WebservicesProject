var mongoose = require('mongoose');
var schema = mongoose.Schema;

var eventSchema = new schema({
	id : {type:String, index:1, required:true, unique:true},
	title: {type:String,required:true},
	description: {type:String },
	state: {type:String},
	city: {type:String },
	place: {type:String},
	startDate: {type:String },
	endDate: {type:String },
	startTime: {type:String},
	endTime: {type:String },
	price: {type:Number},
	coin: {type:String },
	state: {type:String},
	image: {type:String,required:true},
	tickets: []
}, {collection:'events'});

var Event = mongoose.model('Event',eventSchema);
module.exports = Event;