var express    = require("express"),
    mongoose   = require("mongoose"),
    Router	   = express.Router(),
    Product    = require("../models/product"),
    Cart       = require("../models/cart");

Router.get("/",function(req,res){
	Cart.findById(req.user._id).populate("clothing").exec(function(err,cart){
		if(err){
			console.log(err);
		}else{
			res.render("cart/viewcart",{newcart:cart});
		}
	}) 
})

module.exports= Router;