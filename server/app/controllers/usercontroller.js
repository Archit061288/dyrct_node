var config =  require("../../configs/configs")
var User = require("../models/usermodel").User
var TwilioAuthService = require('node-twilio-verify')
var jwt =  require("jsonwebtoken");

//var client = require("twilio")(config.accountSid, config.authToken);


 var twilioAuthService = new TwilioAuthService();
     twilioAuthService.init(config.accountSid, config.authToken);
     twilioAuthService.setFromNumber(config.FromNumber);

exports.generatecode = function(req,res){
	var userdata = req.body;
	var councode = userdata.countrycode;
	var mobnumber = userdata.mobnumber;
	
	if(councode != undefined && mobnumber != undefined){
	var councodemobnum = councode+mobnumber;
	console.log(councodemobnum)

	twilioAuthService.sendCode(config.ToNumber, "Your OTP is ").then(function(results) {
        var user = new User(userdata);
        user.save();
        res.status(200).send({
        	msg:"OTP send successfully",
        	data: results
        });
    }, function error(err) {
         res.send({
        	status:500,
        	msg: "Error while generating code."
        });
    });
    }else{
    	res.send({
    		msg:"Request Parameter is missing"
    	})
    }

	
}

exports.userregistration = function(req,res){
	var userdata = req.body;
	var councode = userdata.countrycode;
	var mobnumber = userdata.mobnumber;
	var councodemobnum = councode+mobnumber;
	
	
	var isValid = twilioAuthService.verifyCode(config.ToNumber, userdata.otpcode);
    if (isValid){
    	User.findOneAndUpdate({mobnumber:userdata.mobnumber},{$set:{
    		otp_verified:userdata.otp_verified,
    		otpcode:userdata.otpcode,
    		password:userdata.password,
    		status:1
    	}},{new:true},function(err,doc){
    		if(err) throw err;
    		res.send({
			msg:'Record Save Successfully',
			status: 200,
			data:doc
		})	
    	})
    } else {
        res.send({
        	status:500,
        	msg: "Please enter proper validation code."
        });
    }
}

exports.loginuser = function(req,res){
	var user = req.body;
	var mobnum = user.Mobnumber;
	var password = user.password;

	var token = jwt.sign(user,process.env.secretKey,{
          expiresInMinutes: 1440 // expires in 24 hours
        })
	
	console.log(typeof(mobnum))
	User.findOneAndUpdate({"mobnumber":mobnum,status:1},{$set:{token:token}},function(err,data){
		console.log(data)
		if(data != "" && data != undefined){
			res.send({
			msg:"Login Successfully",
			status:200,
			token:token
		})	
		}else{
			res.send({
				msg:"Error while Login"
			})
		}
		
	})

}
exports.logout =  function(req,res){
		
}



