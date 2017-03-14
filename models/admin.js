var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var adminSchema = new mongoose.Schema({
	username : {type:String,required:true},
	password : {type:String}
});

adminSchema.plugin(passportLocalMongoose);
var Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;