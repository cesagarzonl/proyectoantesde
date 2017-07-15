var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var User = require("./models/user").User;
//var User2 = require("./models/user2").User2;
var session = require("express-session");
var router_app = require("./router_app")
var session_middleware = require("./middlewares/session")
var methodOverride = require("method-override");
var formidable = require("express-formidable");
var RedisStore = require("connect-redis")(session);
var http = require("http");
var realtime = require("./realtime")
var imagen_find = require("./middlewares/find_imagen");
var video_find = require("./middlewares/find_video");
var Imagen = require("./models/imagenes");
var Video = require("./models/video");
var Contacto = require("./models/contacto");
var app = express();
var router = express.Router();
var fs = require("fs");
var nodemailer = require("nodemailer");
var url = require('url');
var cookiSession = require("cookie-session");
var redis = require("redis");
var client =redis.createClient();
var app = express();
var path = require("path")
var passport = require('passport');
var Cropper = require('cropperjs')
require('./passport')(passport);

app.get("/", function(req,res,next){
User.find(function(err,users){
	Imagen.find({})
		.populate("creator")
		.exec(function(err,imagenes){
			if(err) {console.log(err);
			}else{
					res.render("home2",{imagenes:imagenes, users:users});}
		})
	})

});

app.get("/pagos", function(req,res,next){
User.find(function(err,users){
	Imagen.find({})
		.populate("creator")
		.exec(function(err,imagenes){
			if(err) {console.log(err);
			}else{
					res.render("pidelo",{imagenes:imagenes, users:users});}
		})
	})

});


app.get("/ingesaya", function(req,res,next){
User.find(function(err,users){
	Imagen.find({})
		.populate("creator")
		.exec(function(err,imagenes){
			if(err) {console.log(err);
			}else{
					res.render("llamativo",{imagenes:imagenes, users:users});}
		})
	})

});
app.get("/iniciado", function(req,res,next){
User.findOne(function(err,user){
	Imagen.find({})
		.populate("creator")
		.exec(function(err,imagenes){
			if(err) {console.log(err);
			}else{
					res.render("home2",{imagenes:imagenes, user:user});}
		})
	})

});
app.use(bodyParser.json({limit: '200mb'}));
app.use(bodyParser.urlencoded({limit: '200mb', extended: true}));
//Fuente: https://www.enmimaquinafunciona.com/pregunta/12776/nodejs-no-es-accesible-desde-ips-externas-en-ubuntu	
app.all("/iniciado/:username/:id",video_find);
app.get("/iniciado/:username/:id", function(req,res,next){
	var query = url.parse(req.url).pathname;
		query = query.split("/").pop()
	var filtro = query
	
	console.log(filtro)
	Imagen.find(User)
		.populate("creator")
		.exec(function(err,imagenes){
			if(err) {console.log(err);
			}else{
				User.findById(filtro,function(err,user){
					Video.find(function(err,videos){	
						res.locals = { user:user };
						res.render("cliente",{imagenes:imagenes,filtro: filtro,videos: videos});}
					)}
				)
			}

		})
});
var server = http.Server(app);
var sessionMiddleware = session({
	store: new RedisStore({}),
	secret:"super ultra secre world"
})
realtime(server,sessionMiddleware)
app.use("/public", express.static('public'));
app.use(bodyParser.urlencoded({extended: true, uploadDir:"public"}));
app.use("/robots.txt", express.static("robots.txt"));
app.use("/sistemap.txt", express.static("sistemap.txt"));
app.use(bodyParser.json()); // para peticiones  aplication/json
 //lee parametros de ptiiones 
app.use(methodOverride("_method"))
app.use(sessionMiddleware);
	/*secret:"123456789abcd",
	resave: false,
	saveUninitialized: false*/
	//genid: function(req){	}
app.use(formidable.parse({ keepExtensions: true }));
app.set("view engine","jade");
app.all("/index",imagen_find);
app.get("/area/*", function(req,res){
	var query = url.parse(req.url).pathname;
	query = query.split("/").pop()
	var filtro = query
	Imagen.find({})
			.populate("creator")
			.exec(function(err,imagenes){
				if(err) {console.log(err);
				}else{
				res.render("duitama",{imagenes:imagenes,filtro:filtro});}
			})
});
app.get("/duitama", function(req,res){

	Imagen.find({})
			.populate("creator")
			.exec(function(err,imagenes){
				if(err) {console.log(err);
				}else{
				res.render("duitama",{imagenes:imagenes});}
			})
});
app.get("/duitamaa", function(req,res){
	Imagen.find({})
			.populate("creator")
			.exec(function(err,imagenes){
				if(err) {console.log(err);
				}else{
				res.render("duitamapromo",{imagenes:imagenes});}
			})
});
app.get("/login",function(req,res){
		res.render("login");
	});
// verbos httpp => Get / post se alteran los encabezados de la peticion 
app.get("/signup",function(req,res){
	User.find(function(err,docs) {	
		res.render("signup");
	});
});
app.get("/loginclie",function(req,res){
	res.render("loginclie")
})	
app.post("/Contacto", function(req,res){
	var contactos = new Contacto({
			nombre: req.body.nombre,
			email: req.body.email,
			ciudad: req.body.ciudad,
			telefono: req.body.telefono,
			mensaje: req.body.mensaje})
contactos.save().then(function(us){
		console.log("Guardamos tus datos ")
		res.redirect("/");
	},function(err){	
		console.log(String(err));
		res.redirect("/usco");			
	});	

});


app.get("/1",function(req,res){
	res.render("enviodecliente")
})	



app.post("/envioclie",function(req,res){
//coleccion areglo de coumentos que cumplen la condicion 
//queri
		var data = {
				email: req.body.email,
				password: req.body.password,
				password_confirmation: req.body.password_confirmation,
				username: req.body.username,
				dir: req.body.dir,
				gremio: req.body.gremio,
				imgtitulo: req.body.imgtitulo,
				telefono: req.body.telefono,
				empre: req.body.empre,
				slogan: req.body.slogan,
				color: req.body.color,
				color1: req.body.color1,
				color2: req.body.color2,
				face: req.body.face,
				twi: req.body.twi,
				you: req.body.you,
				departamento :req.body.departamento,
				ciudad :req.body.ciudad,
				estilo :req.body.estilo,
				elegido :req.body.elegido,
				insta: req.body.insta,
				horariolv :req.body.horariolv,
				horariosdf :req.body.horariosdf,
				web: req.body.web,
				web: req.body.observaciones,
				vip: req.body.vip
		}
		console.log(data)
		var transporter = nodemailer.createTransport('smtps://antesde.com%40gmail.com:elbarbas01@smtp.gmail.com');
		var mailOptions = {
	    from: '"Antes-de.com 👥" ', // sender address
	    to:"antesde.com@gmail.com", //req.body.correocliente, //, // list of receivers
	    subject: 'Un nuevo usuario ✔', // Subject line
	    text: 'Tienes una duda de un usuario #{data} 🐴', // plaintext body
	    html: '<b>Hola tines un nuevo cliente Antes-de.com el email es </b>'+ req.body.email +"<p>su password es   </p>" + req.body.password +"<p>su username es   </p>" + req.body.username +"<p>su direccion es   </p>"+ req.body.dir +"<p>su Gremio es   </p>"+ req.body.gremio +"<p>su imgtitulo es   </p>" + req.body.imgtitulo + "<p>su telefono es   </p>" + req.body.telefono + "<p>su empresa es   </p>" + req.body.empre+ "<p>su slogan es   </p>" + req.body.slogan + "<p>su color1 es   </p>" + req.body.color + "<p>su color2 es   </p>" + req.body.color1 + "<p>su color 3 es   </p>" + req.body.color2 + "<p>su telefono es   </p>" + req.body.telefono + "<p>su face es   </p>" + req.body.face + "<p>su twi es   </p>" + req.body.twi + "<p>su you es   </p>" + req.body.you + "<p>su departamento  es   </p>" + req.body.departamento + "<p>su ciudad es   </p>" + req.body.ciudad + "<p>su estilo es   </p>" + req.body.estilo + "<p>su elegido es   </p>" + req.body.elegido + "<p>su insta es   </p>" + req.body.insta + "<p>su horario es   </p>" + req.body.horariolv+"  "+req.body.horariosdf+ "<p>su vip es   </p>" + req.body.vip+ "<p>Observaciones   </p>"+ req.body.observaciones,
	};
		transporter.sendMail(mailOptions, function(error, info){
			if(error){
		       return console.log(error);
		    }else{
		    console.log('Message sent:'  );
			res.redirect("/envio/ok");		    
				}
		});
		res.redirect("/envio/ok");
		
});

app.post("/users", function(req,res){
	if (req.body.color != null ) {
		var colora = req.body.color.split("#").pop();
		var colorb = req.body.color1.split("#").pop();
		var colorc = req.body.color2.split("#").pop();
		var user = new User({email: req.body.email,
				password: req.body.password,
				password_confirmation: req.body.password_confirmation,
				username: req.body.username,
				dir: req.body.dir,
				gremio: req.body.gremio,
				imgtitulo: req.body.imgtitulo,
				telefono: req.body.telefono,
				empre: req.body.empre,
				slogan: req.body.slogan,
				color: colora,
				color1: colorb,
				color2: colorc,
				face: req.body.face,
				twi: req.body.twi,
				you: req.body.you,
				departamento :req.body.departamento,
				ciudad :req.body.ciudad,
				estilo :req.body.estilo,
				elegido :false,
				insta: req.body.insta,
				horariolv :req.body.horariolv,
				horariosdf :req.body.horariosdf,
				web: req.body.web,
				vip: false
				});}
	else{
		var user = new User({email: req.body.email,
				password: req.body.password,
				password_confirmation: req.body.password_confirmation,
				username: req.body.username,
				dir: req.body.dir,
				gremio: req.body.gremio,
				imgtitulo: req.body.imgtitulo,
				telefono: req.body.telefono,
				empre: req.body.empre,
				slogan: req.body.slogan,
				color: colora,
				color1: colorb,
				color2: colorc,
				face: req.body.face,
				twi: req.body.twi,
				you: req.body.you,
				departamento :req.body.departamento,
				ciudad :req.body.ciudad,
				estilo :req.body.estilo,
				elegido :false,
				insta: req.body.insta,
				horariolv :req.body.horariolv,
				horariosdf :req.body.horariosdf,
				web: req.body.web,
				vip: false
				});
	}	
	console.log(user)
	user.save().then(function(err){
			User.findOne({email:req.body.email,password:req.body.password},function(err,user){
				req.session.user_id=user._id;
				if (user.color == "") {
					res.redirect("/");
				}
				else{
				res.redirect("/app/imagenes/new");
						}
					});
	},function(err){	
		console.log(String(err));
		res.redirect("/usco");			
	});	
});
app.get("/usco", function(req,res,next){
User.find(function(err,users){
	Imagen.find({})
		.populate("creator")
		.exec(function(err,imagenes){
			if(err) {console.log(err);
			}else{
					res.render("usco",{imagenes:imagenes, users:users});}
		})
	})

});

app.post("/session", function(req,res){
	User.findOne({email:req.body.email,password:req.body.password},function(err,user){
		req.session.user_id=user._id;
		if (user.color == "") {
			res.redirect("/");
		}
		else{
			res.redirect("/iniciado/"+user.username+"/"+user.id);
		}
	});
});
app.use("/app",session_middleware);
app.use("/app", router_app);
app.all("/imagenes/:username*",imagen_find);

app.get("/compras_dui", function(req,res){
	Imagen.find({})
			.populate("creator")
			.exec(function(err,imagenes){
				if(err) {console.log(err);
				}else{
				res.render("compras_dui",{imagenes:imagenes});}
			})
});

app.get("/nosotros",function(req,res){
	res.render("nosotros")
})	

app.get("/nada", function(req,res,next){
User.find(function(err,users){
	Imagen.find({})
		.populate("creator")
		.exec(function(err,imagenes){
			if(err) {console.log(err);
			}else{
					res.render("nada2",{imagenes:imagenes, users:users});}
		})
	})

});

app.post("/nada", function(req,res,next){
User.find(function(err,users){
	Imagen.find({})
		.populate("creator")
		.exec(function(err,imagenes){
			if(err) {console.log(err);
			}else{
			contr = req.body.contr
				if (contr == "cesarescool") {
					User.find(function(err,users){
					res.render("nada",{users:users,imagenes:imagenes});
					});
				}else{
					res.redirect("nada");
				}
					;}
		})
	})

});

app.get("/politicas", function(req,res,next){
User.find(function(err,users){
	Imagen.find({})
		.populate("creator")
		.exec(function(err,imagenes){
			if(err) {console.log(err);
			}else{
					res.render("politicas",{imagenes:imagenes, users:users});}
		})
	})

});	


app.get("/promocion/*", function(req,res,next){
	var query = url.parse(req.url).pathname;
		query = query.split("/").pop()
	var filtro = query
	console.log(filtro)
Imagen.find({})
			.populate("creator")
			.exec(function(err,imagenes){
				if(err) {console.log(err);
				}else{
		User.findOne({},function(err,user){
			res.render("homepromo",{imagenes:imagenes, filtro:filtro, user:user});}
			)
			}
		})
	})
app.get("/promocion", function(req,res,next){
	var query = url.parse(req.url).pathname;
		query = query.split("/").pop()
	var filtro = query
	console.log(filtro)
Imagen.find({})
			.populate("creator")
			.exec(function(err,imagenes){
				if(err) {console.log(err);
				}else{
		User.findOne({},function(err,user){
			res.render("homepromo",{imagenes:imagenes, filtro:filtro, user:user});}
			)
			}
		})
	})
app.get("/index/*", function(req,res,next){
	var query = url.parse(req.url).pathname;
		query = query.split("/").pop()
	var filtro = query
	console.log(filtro)
Imagen.find({})
			.populate("creator")
			.exec(function(err,imagenes){
				if(err) {console.log(err);
				}else{
		User.findOne({},function(err,user){
			res.render("home2",{imagenes:imagenes, filtro:filtro, user:user});}
			)
			}
		})
	})


app.get("/comidas/*", function(req,res,next){
	var query = url.parse(req.url).pathname;
		query = query.split("/").pop()
	var filtro = query
	console.log(filtro)
	Imagen.find({})
			.populate("creator")
			.exec(function(err,imagenes){
				if(err) {console.log(err);
				}else{
		User.findOne({},function(err,user){
			res.render("homecomidas",{imagenes:imagenes, filtro:filtro, user:user});}
			)
			}
		})
	})
app.get("/turismo/*", function(req,res,next){
	var query = url.parse(req.url).pathname;
		query = query.split("/").pop()
	var filtro = query
	console.log(filtro)
	Imagen.find({})
			.populate("creator")
			.exec(function(err,imagenes){
				if(err) {console.log(err);
				}else{
		User.findOne({},function(err,user){
			res.render("hometurismo",{imagenes:imagenes, filtro:filtro, user:user});}
			)
			}
		})
	})
app.get("/fincaraiz/*", function(req,res,next){
	var query = url.parse(req.url).pathname;
		query = query.split("/").pop()
	var filtro = query
	console.log(filtro)
	Imagen.find({})
			.populate("creator")
			.exec(function(err,imagenes){
				if(err) {console.log(err);
				}else{
		User.findOne({},function(err,user){
			res.render("homefincaraiz",{imagenes:imagenes, filtro:filtro, user:user});}
			)
			}
		})
	})
app.get("/Construccion/*", function(req,res,next){
	var query = url.parse(req.url).pathname;
		query = query.split("/").pop()
	var filtro = query
	console.log(filtro)
	Imagen.find({})
			.populate("creator")
			.exec(function(err,imagenes){
				if(err) {console.log(err);
				}else{
		User.findOne({},function(err,user){
			res.render("homeconstruccion",{imagenes:imagenes, filtro:filtro, user:user});}
			)
			}
		})
	})
app.get("/Transporte/*", function(req,res,next){
	var query = url.parse(req.url).pathname;
		query = query.split("/").pop()
	var filtro = query
	console.log(filtro)
	Imagen.find({})
			.populate("creator")
			.exec(function(err,imagenes){
				if(err) {console.log(err);
				}else{
		User.findOne({},function(err,user){
			res.render("hometransporte",{imagenes:imagenes, filtro:filtro, user:user});}
			)
			}
		})
	})
app.get("/Recreacion/*", function(req,res,next){
	var query = url.parse(req.url).pathname;
		query = query.split("/").pop()
	var filtro = query
	console.log(filtro)
	Imagen.find({})
			.populate("creator")
			.exec(function(err,imagenes){
				if(err) {console.log(err);
				}else{
		User.findOne({},function(err,user){
			res.render("homerecreacion",{imagenes:imagenes, filtro:filtro, user:user});}
			)
			}
		})
	})
app.get("/Artesanias/*", function(req,res,next){
	var query = url.parse(req.url).pathname;
		query = query.split("/").pop()
	var filtro = query
	console.log(filtro)
	Imagen.find({})
			.populate("creator")
			.exec(function(err,imagenes){
				if(err) {console.log(err);
				}else{
		User.findOne({},function(err,user){
			res.render("homeartesanias",{imagenes:imagenes, filtro:filtro, user:user});}
			)
			}
		})
	})
app.get("/Belleza/*", function(req,res,next){
	var query = url.parse(req.url).pathname;
		query = query.split("/").pop()
	var filtro = query
	console.log(filtro)
	Imagen.find({})
			.populate("creator")
			.exec(function(err,imagenes){
				if(err) {console.log(err);
				}else{
		User.findOne({},function(err,user){
			res.render("homebelleza",{imagenes:imagenes, filtro:filtro, user:user});}
			)
			}
		})
	})
app.get("/Diseno/*", function(req,res,next){
	var query = url.parse(req.url).pathname;
		query = query.split("/").pop()
	var filtro = query
	console.log(filtro)
	Imagen.find({})
			.populate("creator")
			.exec(function(err,imagenes){
				if(err) {console.log(err);
				}else{
		User.findOne({},function(err,user){
			res.render("homediseno",{imagenes:imagenes, filtro:filtro, user:user});}
			)
			}
		})
	})
app.get("/Entretenimiento/*", function(req,res,next){
	var query = url.parse(req.url).pathname;
		query = query.split("/").pop()
	var filtro = query
	console.log(filtro)
	Imagen.find({})
			.populate("creator")
			.exec(function(err,imagenes){
				if(err) {console.log(err);
				}else{
		User.findOne({},function(err,user){
			res.render("homeEntretenimiento",{imagenes:imagenes, filtro:filtro, user:user});}
			)
			}
		})
	})
app.get("/hospedaje/*", function(req,res,next){
	var query = url.parse(req.url).pathname;
		query = query.split("/").pop()
	var filtro = query
	console.log(filtro)
	Imagen.find({})
			.populate("creator")
			.exec(function(err,imagenes){
				if(err) {console.log(err);
				}else{
		User.findOne({},function(err,user){
			res.render("homehospedaje",{imagenes:imagenes, filtro:filtro, user:user});}
			)
			}
		})
	})
app.get("/Bebidas/*", function(req,res,next){
	var query = url.parse(req.url).pathname;
		query = query.split("/").pop()
	var filtro = query
	console.log(filtro)
	Imagen.find({})
			.populate("creator")
			.exec(function(err,imagenes){
				if(err) {console.log(err);
				}else{
		User.findOne({},function(err,user){
			res.render("homebebidas",{imagenes:imagenes, filtro:filtro, user:user});}
			)
			}
		})
	})
app.get("/Variedades/*", function(req,res,next){
	var query = url.parse(req.url).pathname;
		query = query.split("/").pop()
	var filtro = query
	console.log(filtro)
	Imagen.find({})
			.populate("creator")
			.exec(function(err,imagenes){
				if(err) {console.log(err);
				}else{
		User.findOne({},function(err,user){
			res.render("homevariedades",{imagenes:imagenes, filtro:filtro, user:user});}
			)
			}
		})
	})
app.get("/servicios/*", function(req,res,next){
	var query = url.parse(req.url).pathname;
		query = query.split("/").pop()
	var filtro = query
	console.log(filtro)
	Imagen.find({})
			.populate("creator")
			.exec(function(err,imagenes){
				if(err) {console.log(err);
				}else{
		User.findOne({},function(err,user){
			res.render("homeservicios",{imagenes:imagenes, filtro:filtro, user:user});}
			)
			}
		})
	})
app.get("/ventas/*", function(req,res,next){
	var query = url.parse(req.url).pathname;
		query = query.split("/").pop()
	var filtro = query
	console.log(filtro)
	Imagen.find({})
			.populate("creator")
			.exec(function(err,imagenes){
				if(err) {console.log(err);
				}else{
		User.findOne({},function(err,user){
			res.render("homeventas",{imagenes:imagenes, filtro:filtro, user:user});}
			)
			}
		})
	})
app.get("/filtro/*", function(req,res,next){
	var query = url.parse(req.url).pathname;
		query = query.split("/").pop()
	var filtro = query
	console.log(filtro)
		Imagen.find({})
			.populate("creator")
			.exec(function(err,imagenes){
				if(err) {console.log(err);
				}else{
				res.render("filtro",{imagenes:imagenes, filtro:filtro});}
			})
});

app.post("/extencion", function(req,res){
	mysearch = req.body.mysearch
	mysearch.toLowerCase()
	console.log(mysearch+"1")
	User.findOne({username:mysearch},function(err,user){
				console.log(mysearch+"3")
			if (user != null) {
					console.log("helado error")
					res.redirect("/iniciado/"+user.username+"/"+user.id);}				
			if (user == null) {
				console.log(mysearch+"2")
					if (mysearch == "moda") {
						res.redirect("/Ventas/undefined")
					}
					else if (mysearch == "variedades") {
						res.redirect("/Variedades/undefined")
					}
					else if (mysearch == "alimentos") {
						res.redirect("comidas/undefined")
					}
					else if (mysearch == "hospedaje") {
						res.redirect("/Hospedaje/undefined")
					}
					else if (mysearch == "entretenimiento") {
						res.redirect("/Entretenimiento/undefined")
					}
					else if (mysearch == "construccion") {
						res.redirect("/Construccion/undefined")
					}
					else if (mysearch == "fincaRaiz") {
						res.redirect("/FincaRaiz/undefined")
					}
					else if (mysearch == "belleza") {
						res.redirect("/Belleza/undefined")
					}
					else if (mysearch == "artesanias") {
						res.redirect("/Artesanias/undefined")
					}	
					else if (mysearch == "recreacion") {
						res.redirect("/Recreacion/undefined")
					}
					else if (mysearch == "transporte") {
						res.redirect("/transporte/undefined")
					}
					else if (mysearch == "transporte") {
						res.redirect("/transporte/undefined")
					}
					else if (mysearch == "transporte") {
						res.redirect("/transporte/undefined")
					}
					else if (mysearch == "bogota") {
						res.redirect("/index/"+mysearch)
					}
					else if (mysearch == "boyaca") {
						res.redirect("/index/"+mysearch)
					}
					else if (mysearch == "cundinamarca") {
						res.redirect("/index/"+mysearch)
					}
					else if (mysearch == "amazonas") {
						res.redirect("/index/"+mysearch)
					}
					else if (mysearch == "antioquia") {
						res.redirect("/index/"+mysearch)
					}
					else if (mysearch == "arauca") {
						res.redirect("/index/"+mysearch)
					}
					else if (mysearch == "atlantico") {
						res.redirect("/index/"+mysearch)
					}
					else if (mysearch == "bolivar") {
						res.redirect("/index/"+mysearch)
					}
					else if (mysearch == "caldas") {
						res.redirect("/index/"+mysearch)
					}
					else if (mysearch == "caqueta") {
						res.redirect("/index/"+mysearch)
					}
					else if (mysearch == "casanare") {
						res.redirect("/index/"+mysearch)
					}
					else if (mysearch == "cauca") {
						res.redirect("/index/"+mysearch)
					}
					else if (mysearch == "cesar") {
						res.redirect("/index/"+mysearch)
					}
					else if (mysearch == "choco") {
						res.redirect("/index/"+mysearch)
					}
					else if (mysearch == "cordoba") {
						res.redirect("/index/"+mysearch)
					}
					else if (mysearch == "guainia") {
						res.redirect("/index/"+mysearch)
					}
					else if (mysearch == "guajira") {
						res.redirect("/index/"+mysearch)
					}
					else if (mysearch == "guaviare") {
						res.redirect("/index/"+mysearch)
					}
					else if (mysearch == "huila") {
						res.redirect("/index/"+mysearch)
					}
					else if (mysearch == "magdalena") {
						res.redirect("/index/"+mysearch)
					}
					else if (mysearch == "meta") {
						res.redirect("/index/"+mysearch)
					}
					else if (mysearch == "nariño") {
						res.redirect("/index/"+mysearch)
					}
					else if (mysearch == "nsantander") {
						res.redirect("/index/"+mysearch)
					}
					else if (mysearch == "santamarta") {
						res.redirect("/index/"+mysearch)
					}
					else if (mysearch == "putumayo") {
						res.redirect("/index/"+mysearch)
					}
					else if (mysearch == "quindio") {
						res.redirect("/index/"+mysearch)
					}
					else if (mysearch == "risaralda") {
						res.redirect("/index/"+mysearch)
					}
					else if (mysearch == "sanandres") {
						res.redirect("/index/"+mysearch)
					}
					else if (mysearch == "santander") {
						res.redirect("/index/"+mysearch)
					}
					else if (mysearch == "tolima") {
						res.redirect("/index/"+mysearch)
					}
					else if (mysearch == "valle") {
						res.redirect("/index/"+mysearch)
					}
					else if (mysearch == "vaupes") {
						res.redirect("/index/"+mysearch)
					}
					else if (mysearch == "vichada") {
						res.redirect("/index/"+mysearch)
					}
					else if (mysearch == "guajira") {
						res.redirect("/index/"+mysearch)
					}

					else if (mysearch == "") {
						res.redirect("/")
					}
					else {
						res.redirect("/")
					}
			}

		})	
	});
app.get("/busca/*", function(req,res){
	var query = url.parse(req.url).pathname;
		query = query.split("/").pop()
	var filtro = query
	console.log(filtro)
	Imagen.find({})
		.populate("creator")
		.exec(function(err,imagenes){
			if(err) {console.log(err);
			}else{
					res.render("busca",{imagenes:imagenes});}
		})
});

app.post("/buscabusca", function(req,res){
	busca = req.body.busca
	console.log(busca)
	   var query = url.parse(req.url,true).query;
	   var variableget = query.variableget;
	   			res.redirect("/busca/"+busca);
});
/*envio de contactenos antesde*/

app.post("/envio3",function(req,res){
//coleccion areglo de coumentos que cumplen la condicion 
//queri
		var data = {
			nombre: req.body.nombre,
			email: req.body.email,
			ciudad: req.body.ciudad,
			tel: req.body.telefono,
			mensaje: req.body.mensaje
		}
		console.log(data)
		var transporter = nodemailer.createTransport('smtps://antesde.com%40gmail.com:elbarbas01@smtp.gmail.com');
		var mailOptions = {
	    from: '"Antes-de.com 👥" ', // sender address
	    to:"antesde.com@gmail.com", //req.body.correocliente, //, // list of receivers
	    subject: 'pregunta de usuarios ✔', // Subject line
	    text: 'Tienes una duda de un usuario 🐴', // plaintext body
	    html: '<b>Hola tines una nueva solicitud de un cliente Antes-de.com el nombre es </b>'+ req.body.nombre +"<p>su email es   </p>" + req.body.email +"<p> esta es la informacion que el dejo en el sistema para ti de:  </p>" +"<p> email </p>" + req.body.email +"<p> Nombre </p>"+ req.body.nombre +"<p> ciudad </p>"+ req.body.ciudad +"<p> numero telefonico </p>" + req.body.telefono + "<p> lo que solicita </p>" + req.body.mensaje,
	};
		transporter.sendMail(mailOptions, function(error, info){
			if(error){
		       return console.log(error);
		    }else{
		    console.log('Message sent:'  );
			res.redirect("/envio/ok");		    
				}
		});
		res.redirect("/envio/ok");
		
});
app.get("/envio/ok",function(req,res){
	res.render("enviamosdatos")
});
/*buscador*/
/*const elasticsearch = require('elasticsearch');

const esClient = new elasticsearch.Client({
  host: '127.0.0.1:5001',
});

const bulkIndex = function bulkIndex(index, type, data) {
  let bulkBody = [];

  data.forEach(item => {
    bulkBody.push({
      index: {
        _index: index,
        _type: type,
        _id: item.id
      }
    });

    bulkBody.push(item);
  });

  esClient.bulk({body: bulkBody})
  .then(response => {
    console.log('here');
    let errorCount = 0;
    response.items.forEach(item => {
      if (item.index && item.index.error) {
        console.log(++errorCount, item.index.error);
      }
    });
    console.log(
      `Successfully indexed ${data.length - errorCount}
       out of ${data.length} items`
    );
  })
  .catch(console.err);
};

const test = function test() {
  const articlesRaw = fs.readFileSync('data.json');
  bulkIndex('library', 'article', articles);
};*/

var passport = require('passport');
require('./models/user');
require('./passport')(passport);

// Configuración de Express
app.use(passport.initialize());
app.use(passport.session());
// Rutas de Passport

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});


app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/twitter/callback', passport.authenticate('twitter',
  { successRedirect: '/', 
    failureRedirect: '/login' }));
app.get('/auth/facebook/callback', passport.authenticate('facebook',
  { successRedirect: '/', 
    failureRedirect: '/login' }));



server.listen(5001);

//server.listen(80, "212.129.55.182" );