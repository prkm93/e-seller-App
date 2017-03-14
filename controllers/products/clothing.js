var express    = require("express"),
    mongoose   = require("mongoose"),
    Router	   = express.Router(),
    Product    = require("../../models/product"),
    Cart 	   = require("../../models/cart"),
    middleware = require("../../middleware/middleware");

var cloth = "product/clothes";
 Router.get("/", function(req,res){
 	Product.find({},function(err,allCloth){
 		if(err){
 			console.log(err);
 		}else{
 			res.render(cloth + "/clothes",{cloth:allCloth});
 		}
 	})
 });

//route to form for adding new cloth
Router.get("/new", middleware.isLoggedInAsAdmin, function(req,res){
	res.render(cloth + "/newCloth");
});

//route to add new cloth (post)
Router.post("/", middleware.isLoggedInAsAdmin, function(req,res){
	var newCloth = req.body.cloth;
	Product.create(newCloth, middleware.isLoggedInAsAdmin, function(err,newCloth){
		if(err){
			console.log(err);
		}else{
			res.redirect("/clothes");
		}
	})
})

//Route to display each cloth
Router.get("/:id",function(req,res){
	Product.findById(req.params.id, function(err,eachCloth){
		if(err){
			console.log(err)
		}else{
			res.render(cloth + "/eachCloth",{cloth:eachCloth})
		}
	});
});

//route to edit the cloth details
Router.get("/:id/edit", middleware.isLoggedInAsAdmin, function(req,res){
	Product.findById(req.params.id,function(err,editCloth){
		if(err){
			console.log(err);
		}else{
			res.render(cloth +"/editCloth",{cloth:editCloth});
		}
	})
})

//route for updating mobile details
Router.put("/:id", middleware.isLoggedInAsAdmin, function(req,res){
	Product.findByIdAndUpdate(req.params.id, req.body.cloth, function(err,updatedCloth){
		if(err){
			console.log(err);
		}else{
			res.redirect("/clothes/" + req.params.id);
		}
	});
});

//route for deleting a product
Router.delete("/:id", middleware.isLoggedInAsAdmin, function(req,res){
	Product.findByIdAndRemove(req.params.id, function(err,removeCloth){
		if(err){
			console.log(err);
		}else{
			res.redirect("/clothes"); 
		}
	})
})

// route to form for adding product in cart
Router.get("/:id/cart",middleware.isLoggedInAsUser,function(req,res){
	Product.findById(req.params.id,function(err,cloth){
		if(err){
			console.log(err);
		}else{
			res.render("cart/addtocart",{cloth:cloth});
		}
	})
});

// 
Router.post("/:id/cart",middleware.isLoggedInAsUser, function(req,res){
	Product.findById(req.params.id, function(err,product){
		if(err){
			console.log(err);
		}else{
			var cartId = {
			id :req.params.id,
			name : product.name 
			};
			var userId = {
				id : req.user._id,
				username : req.user.username
			};
		    var newCart = {cart:cartId, quantity:req.body.quantity , price :product.price , user:userId};
			Cart.create(newCart,function(err,cart){
				if(err){
					console.log(err)
				}else{
					console.log(cart);
					res.redirect("/clothes/" + req.params.id);
					console.log("saved");		
				}
			})	
		}
	})
	
})
module.exports = Router;