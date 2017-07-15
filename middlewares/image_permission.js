var Imagen = require("../models/imagenes");

module.exports = function(imagen,req,res){
	if (typeof imagen.creator == "undefined")return false;
	//true = tiene permisos
	//false = No tiene permisos
	if (req.method === "GET" && req.path.indexOf("edit") < 0 ){
			return true;
	}		
	if (imagen.creator._id.toString() == res.locals.user._id) {
		return true;
	}
	return false
}	