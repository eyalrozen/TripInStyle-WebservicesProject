var mongoose = require('mongoose');
var Category = require('./category');
var State = require('./state');
var Event = require('./event');


exports.getCategories = function(req,res)
{
	console.log("Get data");
	Category.find({}).
	exec(function(err,docs){
		res.json(docs);
		return;
	});
}

exports.getAllEvents = function(req,res)
{
	console.log("Get All events");
	Event.find({}).
	exec(function(err,docs){
		res.json(docs);
		return;
	});
}

exports.getAllStates = function(req,res)
{
	console.log("Get All states");
	State.find({}).
	exec(function(err,docs){
		res.json(docs);
		return;
	});
}

exports.getEventsByCategory = function(req,res,cat)
{
	console.log("Get categories "+cat );
	var categoryArray = ArrayToLowerCase(cat);
	Event.find({'category':{$in :categoryArray}}).
	exec(function(err,docs){
		res.json(docs);
		return;
	});
}


exports.getEventsByState = function(req,res,cat,state)
{
	var categoryArray = ArrayToLowerCase(cat);
	console.log("Get events from state " +state + " catergories: "+categoryArray );
	Event.find({
		'state': state,
		'category':{$in :categoryArray}}).
	exec(function(err,docs){
		res.json(docs);
		return;
	});
}

function ArrayToLowerCase(array)
{
	lowerCaseArray =[];
	for (var i = 0; i < array.length; i++)
	{
		lowerCaseArray.push(array[i].toLowerCase());
	};
	return lowerCaseArray;
}

