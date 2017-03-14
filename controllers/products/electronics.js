var express    = require("express"),
    mongoose   = require("mongoose"),
    Router	   = express.Router(),
    Product    = require("../../models/product"),
    middleware = require("../../middleware/middleware");

//Route for products page
Router.get("/", function(req,res){
	res.render("product/electronics/electronics");
});

//ROUTES FOR MOBILES
var mobile = "product/electronics/mobiles";

// for displaying all mobiles
Router.get("/mobiles", function(req,res){
	Product.find({},function(err,allMobiles){
		if(err){
			console.log(err);
		}else{
			res.render(mobile +"/mobiles",{mobile:allMobiles});
		}
	})
});

//route to form for adding new mobile
Router.get("/mobiles/new", middleware.isLoggedInAsAdmin, function(req,res){
	res.render(mobile + "/newmobile");
});

//route for creating new mobile
Router.post("/mobiles",middleware.isLoggedInAsAdmin, function(req,res){
	var newMobile = req.body.mobile;
	Product.create(newMobile, function(err,newMobile){
		if(err){
			console.log(err);
		}else{
			res.redirect("/electronics/mobiles");
		}
	})
})

//route for displaying each mobile
Router.get("/mobiles/:id",function(req,res){
	Product.findById(req.params.id, function(err,eachMobile){
		if(err){
			console.log(err);
		}else{
			res.render(mobile +"/eachMobile",{mobile:eachMobile});
		}
	});
});

//route to edit the mobile details
Router.get("/mobiles/:id/edit", middleware.isLoggedInAsAdmin, function(req,res){
	Product.findById(req.params.id,function(err,editMobile){
		if(err){
			console.log(err);
		}else{
			res.render(mobile +"/editMobile",{mobile:editMobile});
		}
	})
})

//route for updating mobile details
Router.put("/mobiles/:id",middleware.isLoggedInAsAdmin, function(req,res){
	Product.findByIdAndUpdate(req.params.id, req.body.mobile, function(err,updatedMob){
		if(err){
			console.log(err);
		}else{
			res.redirect("/electronics/mobiles/" + req.params.id);
		}
	});
});

//route for deleting a product
Router.delete("/mobiles/:id", middleware.isLoggedInAsAdmin, function(req,res){
	Product.findByIdAndRemove(req.params.id, function(err,removeMobile){
		if(err){
			console.log(err);
		}else{
			res.redirect("/electronics/mobiles"); 
		}
	})
})

// FOR LAPTOPS
var laptop = "product/electronics/laptops";

// for displaying all laptops
Router.get("/laptops", function(req,res){
	Product.find({},function(err,allLaptops){
		if(err){
			console.log(err);
		}else{
			res.render(laptop +"/laptops",{laptop : allLaptops});
		}
	})
});

//route to form for adding new laptop
Router.get("/laptops/new", function(req,res){
	res.render(laptop + "/newlaptop");
});

//route for creating new laptop
Router.post("/laptops", function(req,res){
	var newLatop = req.body.laptop;
	Product.create(newLatop, function(err,newLaptop){
		if(err){
			console.log(err);
		}else{
			res.redirect("/electronics/laptops");
		}
	})
})

//route for displaying each laptop
Router.get("/laptops/:id",function(req,res){
	Product.findById(req.params.id, function(err,eachLaptop){
		if(err){
			console.log(err);
		}else{
			res.render(laptop +"/eachLaptop",{laptop:eachLaptop});
		}
	});
});

//route to form for editing the laptop details
Router.get("/laptops/:id/edit", function(req,res){
	Product.findById(req.params.id,function(err,editLaptop){
		if(err){
			console.log(err);
		}else{
			res.render(laptop +"/editLaptop",{laptop:editLaptop});
		}
	})
})

//route to update laptop details
Router.put("/laptops/:id",function(req,res){
	Product.findByIdAndUpdate(req.params.id,req.body.laptop,function(err,updatedLaptop){
		if(err){
			console.log(err);
		}else{
			res.redirect("/electronics/laptops/" + req.params.id);
		}
	})
})

//route for deleting a product
Router.delete("/laptops/:id", function(req,res){
	Product.findByIdAndRemove(req.params.id, function(err,removeLaptop){
		if(err){
			console.log(err);
		}else{
			res.redirect("/electronics/laptops"); 
		}
	})
})
module.exports = Router;
