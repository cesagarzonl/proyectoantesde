var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var contacto = new Schema({
	nombre:{type:String,require:true},
	email:{type:String,require:true},
	ciudad:{type:String,require:true},
	telefono:{type:String,require:true},
	mensaje:{type:String,require:true}
});

var Contacto = mongoose.model("Contacto",contacto);
module.exports = Contacto;