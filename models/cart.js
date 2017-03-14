var mongoose = require("mongoose");

var cartSchema = new mongoose.Schema({
	cart : {
		id : {
			type:mongoose.Schema.Types.ObjectId,
			ref:"Product"
		},
		name : {type:String}
	},
	quantity : {type:Number},
	price : {type:Number},
	user : {
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"User"
		},
		username :{type:String}
	}
})

var Cart = mongoose.model("Cart",cartSchema);
module.exports = Cart;

//array of objects prod id and qty