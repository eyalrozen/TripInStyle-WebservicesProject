var mongoose = require('mongoose');
var Category = require('./category');
var Event = require('./event');

exports.getCategories = function(req,res)
{
	console.log("Get data");
	Category.find({}).
	exec(function(err,docs){
		console.log("docs :" +docs);
		res.json(docs);
		return;
	});
}

exports.getAllEvents = function(req,res)
{
	console.log("Get data");
	Event.find({}).
	exec(function(err,docs){
		console.log("docs :" +docs);
		res.json(docs);
		return;
	});
}

exports.getEventsByCategory = function(req,res,cat)
{
	console.log("Get category "+cat );
	if(Array.isArray(cat))
	{
		Event.find({'category':{$in :cat}}).
		exec(function(err,docs){
		console.log("docs :" +docs);
		res.json(docs);
		return;
		});
	}
	else
	{
	Event.find({'category': cat}).
		exec(function(err,docs){
		console.log("docs :" +docs);
		res.json(docs);
		return;
		});
	}
}

