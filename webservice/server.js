var express = require ('express');
var app = express();
var TISController = require('./TISController');
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('port',port);
app.use('/',express.static('./public'));
app.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Headers","Origin, X-Requested-With","Content-Type, Accept");
	app.set('json spaces',4);
	res.set("Content-Type","application/json");
	next();
});

app.get('/getAllCategories',TISController.getCategories);
app.get('/getAllEvents',TISController.getAllEvents);
app.post('/getEventsByCategory',function(req,res)
	{
		var cat = req.body.category;
		TISController.getEventsByCategory(req,res,cat);
		//console.log(cat);
	});

app.listen(port);
console.log("listening on port "+port);