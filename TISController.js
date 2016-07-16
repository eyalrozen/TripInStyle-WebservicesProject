var mongoose = require('mongoose');
var Category = require('./category');
var State = require('./state');
var Event = require('./event');
var User = require('./user');
var generatePassword = require('password-generator');

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
	try
	{
		var categoryArray = ArrayToLowerCase(cat);
	}
	catch(err)
	{
		res.json({"error":"Unable to parse categories using request format"});
		return;
	}
	Event.find({'category':{$in :categoryArray}}).
	exec(function(err,docs){
		res.json(docs);
		return;
	});
}


exports.getEventsByState = function(req,res,cat,state)
{
	try
	{
		var categoryArray = ArrayToLowerCase(cat);
	}
	catch(err)
	{
		res.json({"error":"Unable to parse categories using request format"});
		return;
	}
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

exports.getUserFavorites = function(req,res,userID)
{
	console.log("Get user "+userID+ " Favorites");
	User.findOne().where('username',userID).exec(function(err,data){
		if(data.favorites.length > 0)
		{
			Event.find({'_id':{$in :data.favorites}}).
			exec(function(err,docs){
				res.json(docs);
				return;
			});
		}
		else{
			res.json(data.favorites);
			return;
		}
	});
}

exports.addPurchase = function(req,res,userID,eventID,ticketsAmount)
{
	console.log("Add purchase to user "+userID+" from event "+eventID+" total tickets:"+ticketsAmount);
	var wantedTicketsArray = [];
	var responseSent = false;
	Event.findOne().where('_id',eventID).exec(function(err,event_data)
	{
		event_data.tickets.forEach(function(ticket,index)
		{
			if(index < ticketsAmount)
			{
				wantedTicketsArray.push(ticket.id);
			}
		});
		if(wantedTicketsArray.length < ticketsAmount)
		{
			res.json({"error":"Not enought tickets. only "+wantedTicketsArray.length+" Available"});
			responseSent = true;
			return;
		}

		User.findOne().where('username',userID).exec(function(err,user_data){
			var userPurchases = user_data.purchases;
			userPurchases.forEach(function(purchase)
			{
				if(purchase.event_id == eventID)
				{
					var duplicatedTicketsArray = [];
					purchase.tickets_id.forEach(function(ticket)
					{
						if(wantedTicketsArray.find(evnt => evnt == ticket))
						{
							duplicatedTicketsArray.push(ticket);
													
						}
					});
					if(duplicatedTicketsArray.length !=0)
					{
						if(!responseSent)
						{
							res.json({"error":"Ticket "+duplicatedTicketsArray+" Already exist in purhcase list"});
							responseSent =true;
							return;
						}
					}
					else
					{
						var currentPurchasedTickets = purchase.tickets_id;
						for(var p =0;p<wantedTicketsArray.length;p++)
						{
							currentPurchasedTickets.push(wantedTicketsArray[p].toString());
						}
						var query = user_data.update({"purchases.event_id":eventID}, {$set: {"tickets_id":currentPurchasedTickets}});
						query.exec(function(err,result)
						{
							if(err)
								res.json({"error":err});
							else
								res.json({"status":"success"});
							responseSent =true;
						});
					}
				}

			});
			if(!responseSent)
			{
				var purchaseToJson = {'event_id':eventID,'tickets_id':wantedTicketsArray};
				var query = user_data.update({$push:{purchases:purchaseToJson}});
				query.exec(function(err,result)
				{
					if(err)
						res.json({"error":err});
					else
						res.json({"status":"success"});
				});
			}
		});
	});
}

exports.getUserPurchases = function(req,res,userID)
{
	console.log("Get user "+userID+ " Purchases");
	User.findOne().where('username',userID).exec(function(err,data){
		var result = '{"purchases":[';
		var ticketsArray = data.purchases;
		var eventsArray = [];
		ticketsArray.forEach(function(purchase,index)
		{
			var eventID = purchase.event_id;
			var tickets_id_array = purchase.tickets_id;
			Event.findOne().where('_id',eventID).exec(function(err,data)
			{
				var eventInfo = {'title':data.title,'city':data.city,'place':data.place,
				'startDate':data.startDate,'endDate':data.endDate,'startTime':data.startTime,'endTime':data.endTime,
				'image':data.image,'tickets':ticketsCompare(data.tickets,tickets_id_array)};
				var stringJson = JSON.stringify(eventInfo);
				result += stringJson;
				if (index < ticketsArray.length - 1)
				{
					result+=",";
				}
				else
				{
					result+="]}";
					res.json(JSON.parse(result));
					return;
				}
			});
		});
	});
}

function ticketsCompare(eventTickets,userTickets)
{
	var ticketsArray =[];
	eventTickets.forEach(function(ticket)
	{
		if(userTickets.find(evnt => evnt == ticket.id))
		{
			ticketsArray.push(ticket);
		}
	});
	return ticketsArray;
}
exports.addNewUser = function(req,res,username,avatar)
{
	console.log("Creating user :"+username);
	CreateUser(req,res,username,avatar);

}

function CreateUser(req,res,username,avatar)
{
	var newUser1 = new User({
		'username':username,
		'password': generatePassword(),
		'favorites': [],
		'purchases':[],
		'avatar':avatar
	});

	newUser1.save(function(err,result)
	{
		if(err)
		{
			console.log("Error:"+err);
			res.json({'error':err});
		}
		else{
			console.log("User "+username+" Added succesfully");
			User.findOne().where('username',username).exec(function(err,data){
				if(err)
				{
					console.log("Error:"+err);
					res.json({'error':err});
				}
				else
				{
					res.json(data);
				}
			});
		}
	});	
}

exports.validateUser = function(req,res,username,avatar)
{
	console.log("validate user "+username);
	User.findOne().where('username',username).exec(function(err,data){
		if(err)
		{
			console.log("Error:"+err);
			res.json({'error':err});
		}
		else
		{
			if(data !=null)
			{
				res.json(data);
			}
			else
			{
				CreateUser(req,res,username,avatar);
			}
		}
	});
}

exports.updateUserFavorites = function(req,res,username,eventID)
{
	console.log("Updating user "+username+" event "+eventID);
	User.findOne().where('username',username).exec(function(err,doc){
		if(err)
		{
			console.log("Error:"+err);
			res.json({"error":err});
		}
		else
		{
			var favoritesArray = doc.favorites;
			if(favoritesArray.indexOf(eventID) > -1)
			{
				var query = doc.update({$pull:{favorites:eventID}});
				query.exec(function(err,result)
				{
					if(err)
						res.json({"error":err});
					else
						res.json({"status":"success"});
				});
			}
			else
			{
				var query = doc.update({$push:{favorites:eventID}});
				query.exec(function(err,result)
				{
					if(err)
						res.json({"error":err});
					else
						res.json({"status":"success"});
				});
			}
		}
	});
}