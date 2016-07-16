var express = require ('express');
var app = express();
var TISController = require('./TISController');
var port = process.env.PORT || 4000;
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('port',port);
app.use('/',express.static('./public'));
app.use('/gplus',express.static('./gplus'));
app.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    app.set('json spaces',4);
    res.set("Content-Type","application/json");
	next();
});

app.get('/getAllCategories',TISController.getCategories);
app.get('/getAllEvents',TISController.getAllEvents);
app.get('/getAllStates',TISController.getAllStates);

app.post('/getEventsByCategory',function(req,res)
{
	var cat = req.body.category.split(",");
	TISController.getEventsByCategory(req,res,cat);
});

app.post('/getEventsByState',function(req,res)
{
	var cat = req.body.category.split(",");
	var state = req.body.state.toLowerCase();
	TISController.getEventsByState(req,res,cat,state);
});

app.post('/getEventByID',function(req,res)
{
	var eventID = req.body.event_id;
	TISController.getEventByID(req,res,eventID);
});
	
app.post('/addUser',function(req,res)
{
	var username = req.body.username;
	var avatar = req.body.avatar;
	TISController.addNewUser(req,res,username,avatar);
});

app.post('/getUserFavorites',function(req,res)
{
	var userID = req.body.username;
	TISController.getUserFavorites(req,res,userID);

});

app.post('/getUserPurchases',function(req,res)
{
	var userID = req.body.username;
	TISController.getUserPurchases(req,res,userID);

});

app.post('/addPurchase',function(req,res)
{
	var userID = req.body.username;
	var eventID = req.body.event_id;
	var ticketsAmount = req.body.tickets_amount;
	TISController.addPurchase(req,res,userID,eventID,ticketsAmount);

});
app.post('/validateUser',function(req,res)
{
	var username = req.body.username;
	var avatar = req.body.avatar;
	TISController.validateUser(req,res,username,avatar);
});

app.post('/updateUserFavorites',function(req,res)
{
	var username = req.body.username;
	var eventID = req.body.event_id;
	TISController.updateUserFavorites(req,res,username,eventID);
});
app.listen(port);
console.log("listening on port "+port);