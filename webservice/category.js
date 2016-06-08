var mongoose = require('mongoose');
var schema = mongoose.Schema;

var categorySchema = new schema({
	id : {type:String, index:1, required:true, unique:true},
	title: {type:String,required:true,unique:true},
	image: {type:String,required:true}
}, {collection:'categories'});

var Category = mongoose.model('Category',categorySchema);
module.exports = Category;