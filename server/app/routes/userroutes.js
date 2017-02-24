module.exports= function(app,express){
	var config =  require("../../configs/configs")
	var Usercontroller  = require("../controllers/usercontroller")
	var router = express.Router();
	var jwt =  require("jsonwebtoken");

	app.post("/api/login",Usercontroller.loginuser)
	app.post("/api/generatecode",Usercontroller.generatecode)
	app.post("/api/userregistration",Usercontroller.userregistration)
	
	router.use(function(req,res,next){
		//console.log(req)
		var token = req.body.token || req.headers['token'];
		if(token){
			jwt.verify(token,process.env.secretKey,function(err,decode){
				if(err){
					res.status(500).send("Invalid Token")
				}else{
					// if everything is good, save to request for use in other routes
					req.decode = decode;
					next();
				}
			})
		}
		else{
			res.send({
				msg:"Enter Proper Token"
			})
		}		
	})
	router.post("/profile",Usercontroller.userprofile)
	app.use(config.api_url, router);
}


