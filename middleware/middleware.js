var middlewareObj ={};

var Product	   = require("../models/product"),
	User	   = require("../models/user"),
	Admin	   =require("../models/admin");

middlewareObj.isLoggedInAsAdmin = function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}else{
		req.flash("error","Please login first as admin!");
		res.redirect("/loginadmin");
	}
}

middlewareObj.isLoggedInAsUser = function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}else{
		req.flash("error","Please login first !");
		res.redirect("/loginuser");
	}
}

module.exports = middlewareObj;