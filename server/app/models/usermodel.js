var mongoose = require("mongoose");
var validate = require('mongoose-validator');

var usermodelSchema = mongoose.Schema({
	countrycode: mongoose.Schema.Types.Mixed,
    country: String,
    mobnumber: String,
    otpcode: Number,
    otp_verified: Boolean,
    password: mongoose.Schema.Types.Mixed,
    confirmpassword: mongoose.Schema.Types.Mixed
})

var users = mongoose.model("User",usermodelSchema);


module.exports={
	 User: users
}