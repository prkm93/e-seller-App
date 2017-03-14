 var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
	category :{type:String},
	name : {type:String, required:true},
	image : {type:String},
	description : {type:String},
	price : {type : Number},
	features : {type:String},
	color : {type:String},
	size : {type:String},
	seller : {type:String},
	admin : {
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"Admin"
		},
		username :{type:String}
	}
});

var Product = mongoose.model("Product", productSchema);
module.exports = Product;
