var mongoose = require('mongoose');
var schema = mongoose.Schema;

var analyticSchema = new schema({
	topic : {type:String },
	info : []
}, {collection:'analytics'});

var Analytic = mongoose.model('Analytics',analyticSchema);
module.exports = Analytic;