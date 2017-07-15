var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Video_schema = new Schema({
	title:{type:String,require:true},
	creator:{type:Schema.Types.ObjectId, ref: "User" },
	imgtitulo:{type:String,require:true},
	mapa:{type:String,require:true},
	extension:{type:String,require:true},
});

var Video = mongoose.model("Video",Video_schema);
module.exports = Video;