// inicalizar base 
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/fotos");
mongoose.Promise = global.Promise;

var posible_valor = ["M","F"];
var email_mathc = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ , "Coloca un email valido"];  

var password_validation = {
	validator: function(p){
			return this.password_confirmation == p;
		},
		message: "Las contraseñas no son iguales "
}

var user_Schema = new Schema( {
	email:String,
	password:{type:String,minleng:[6,"por favor adjunta una contraseña mas larga"], 
	validate: password_validation},
	slogan:{type:String,require:true},
	username:{type:String,require:true,maxleng:[50,"username muy largo"]},
	//age:{type: Number, min:[11, "la edad no puede ser menor de 11"], max:[100, "la edad no puede ser menor de 100"]},
	email: {type: String, require:"es obliugatorio un correo", match:  email_mathc}, //dato obligatorio {type: String, require:true}{require:"el correo es obligatorio "} 
	//date_of_birth:Date,
	gremio:{type:String,require:true,maxleng:[20]},
	imgtitulo:{type:String,require:true,maxleng:[20]},
	dir:{type:String,require:true,maxleng:[50,"username muy largo"]},
	telefono:{type:String,require:true,maxleng:[20]},
	empre:{type:String,require:true,maxleng:[500]},
	color:{type:String,require:true},
	provider:{type:String,require:true},
	color1:{type:String,require:true},
	color2:{type:String,require:true},
	face:{type:String,require:true},
	twi:{type:String,require:true},
	you:{type:String,require:true},
	departamento:{type:String,require:true},
	estilo:{type:String,require:true},
	ciudad:{type:String,require:true},
	elegido:{type:Boolean,require:true},
	createdate:{type:Date,default :Date.now},
	web:{type:String,require:true},
	horariolv:{type:String,require:true},
	horariosdf:{type:String,require:true},
	insta:{type:String,require:true},
	vip:{type:Boolean,require:true}
//	sex: {type:String,enum:{values: posible_valor,message:"opcion no valida "}}
});

user_Schema.virtual("password_confirmation").get(function(){
		return this.p_c;
	}).set(function(password){
		this.p_c = password;
});












var User = mongoose.model("User", user_Schema);
//modelo de conexiones
module.exports.User = User;





//BootstapCDN

//inicar secion 
	// usuario prsonas que ntran
	// lciente que dan dinero 
		//perfil
			// ubicacion donde recide  si son varios y 
			// telfono 
			// datos de usuario correo direccion telefono foto deporno 
		//hce un pedido a domicilio  cliente recibe informacioon  para entregar el producto 
			//envio 