var Video = require("../models/imagenes")
var owner_check = require("./image_permission");

module.exports = function(req,res,next){
Video.findById()
	.populate("creator")
	.exec(function(err,video){
	if (video != null ) {
		res.locals.video = video;
		next();
	}else{
		res.locals.video = video;
		next();
		}
	})
}