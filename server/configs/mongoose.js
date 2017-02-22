var config = require("./configs")
var mongoose = require("mongoose");

module.exports = function(){
	var db = mongoose.connect(config.db);
	require('../app/models/usermodel')
	return db;
}