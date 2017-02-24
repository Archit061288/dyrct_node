var express = require("express");
var bodyParser  = require("body-parser")
//var nodemailer =  require("nodemailer");

module.exports = function(){
	var app = express();
	// Parse incoming request bodies in a middleware before your handlers available under req.body
	// Return middleware that only parse JSON. 
	app.use(bodyParser.json())	

	require('../app/routes/userroutes.js')(app, express);
	//require('../app/routes/mailer.server.routes.js')(app, express);
	return app;
}



