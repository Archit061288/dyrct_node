var config =  require("../../configs/configs")
var User = require("../models/usermodel").User
var TwilioAuthService = require('node-twilio-verify')
//var client = require("twilio")(config.accountSid, config.authToken);


 var twilioAuthService = new TwilioAuthService();
     twilioAuthService.init(config.accountSid, config.authToken);
     twilioAuthService.setFromNumber(config.FromNumber);

exports.generatecode = function(req,res){
	var userdata = req.body;
	var councode = userdata.countrycode;
	var mobnumber = userdata.mobnumber;
	
	var councodemobnum = councode+mobnumber;

	twilioAuthService.sendCode(councodemobnum, "Your OTP is ").then(function(results) {
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
	
}

exports.userregistration = function(req,res){
	var userdata = req.body;
	var councode = userdata.countrycode;
	var mobnumber = userdata.mobnumber;
	var councodemobnum = councode+mobnumber;
	
	var isValid = twilioAuthService.verifyCode(councodemobnum, userdata.otp);
    if (isValid){
    	User.findOneAndUpdate({mobnumber:userdata.mobnumber},{$set:{
    		otp_verified:userdata.otp_verified,
    		otpcode:userdata.otpcode,
    		password:userdata.password,
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



