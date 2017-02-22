var mongoose = require("mongoose");

var usermodelSchema = mongoose.Schema({
	firstname:String,
	lastname:String,
	email:String,
	username:String,
	password:String
})

var users = mongoose.model("User",usermodelSchema);

module.exports={
	 User: users
}