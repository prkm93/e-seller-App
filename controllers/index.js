var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Admin= require("../models/admin");
var middleware = require("../middleware/middleware");

// Route for index/home page
router.get("/",function(req,res){
	res.render("landing");
});

// AUTHORIZATION ROUTES

//show signup form for user
router.get("/signup",function(req,res){
	res.render("signup");
});

//show sign up form as admin
router.get("/admin",function(req,res){
	res.render("admin");
})

//route to show login form as user
router.get("/loginuser",function(req,res){
	res.render("login");
});

//route to show login form as admin
router.get("/loginadmin",function(req,res){
	res.render("loginadmin");
});

//route to post the form as user
router.post("/signup",function(req,res){
	var newUser = new User({username:req.body.username});
	User.register(newUser,req.body.password,function(err,user){
		if(err){
			return res.render("signup",{"error":err.message});
		}else{
			passport.authenticate("local")(req,res,function(){
				req.flash("success","Welcome to E-Seller " + req.body.username + " !! ");
				res.redirect("/");
			});
		}
	});
});

// route to post the form as admin
router.post("/admin",function(req,res){
	var newAdmin = new Admin({username:req.body.username});
	Admin.register(newAdmin,req.body.password,function(err,admin){
		if(err){
			return res.render("admin",{"error":err.message});
		}else{
			passport.authenticate("local")(req,res,function(){
				req.flash("success","Welcome to E-Seller as Admin " + req.body.username + " !! ");
				res.redirect("/");
			});
		}
	});
});

//handling login logic for user
router.post("/loginuser", passport.authenticate("local",{
	successRedirect : "/",
	failureRedirect : "/loginuser"
}),function(req,res){

});

//handling login logic for admin
router.post("/loginadmin", passport.authenticate("local",{
	successRedirect : "/",
	failureRedirect : "/loginadmin"
}),function(req,res){

});

//logout route
router.get("/logout",function(req,res){
	req.logout();
	req.flash("success","Logged you out !");
	res.redirect("/");
	res.send("logged you out");
});

module.exports = router;




