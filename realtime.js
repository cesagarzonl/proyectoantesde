module.exports =function(server,sessionMiddleware){
	var io =require("socket.io")(server);
//	var redis = require("redis")
//	var client =redis.createClient();

//		client.subscribe("images");

	io.use(function(socket,next){
		sessionMiddleware(socket.request,socket.request.res,next);
	});
	/*client.on("message",function(channer,message){
			console.log("recibimos tu mensage")
		console.log(message )

	})*/
	io.sockets.on("coneccion",function(socket){
		console.log(socket.request.session.user_id);
	});
}