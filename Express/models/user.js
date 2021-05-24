var mongoose = require("mongoose");
var UserSchem = mongoose.Schema({
	username:String,
	id:String
});
var User - mongoose.model("User", UserSchem);
module.exports=User;