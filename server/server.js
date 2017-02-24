process.env.NODE_ENV = process.env.NODE_ENV || "development";

var express = require("./configs/express")
var config =  require("./configs/configs")
var mongoose = require("./configs/mongoose")
var jwt =  require("jsonwebtoken");
//var nodemailer =  require("nodemailer");

process.env.secretKey = "mysecretkey";
var app = express();
var db1 = mongoose();

app.listen(config.port,function(){
	console.log("Listen To Port "+ config.port)
})


