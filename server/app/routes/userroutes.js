module.exports= function(app,express){
	var config =  require("../../configs/configs")
	var Usercontroller  = require("../controllers/usercontroller")
	var router = express.Router();

	router.post("/generatecode",Usercontroller.generatecode)
	router.post("/userregistration",Usercontroller.userregistration)
	
	app.use(config.api_url, router);
}


