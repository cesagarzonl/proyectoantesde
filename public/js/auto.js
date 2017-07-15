function subir() {
var	valor = document.getElementById("username").value; 
document.getElementById('pepe').innerHTML = valor;
}
function empress() {
var	valor = document.getElementById("empre").value; 
document.getElementById('pepe5').innerHTML = valor; 
}
function subir1() {
var	valor = document.getElementById("slogan").value; 
document.getElementById('pepe3').innerHTML = valor; 
}
function subircolor() {
var	valor = document.getElementById("color").value; 
document.getElementById('muestra').style.background = valor;
document.getElementById('muestra1').style.background = valor;
}
function subircolor1() {
var	valor = document.getElementById("color1").value; 
document.getElementById('pepe2').style.color = valor;
}
function subircolor2() {
var	valor = document.getElementById("color2").value; 
document.getElementById('pepe').style.color = valor;
document.getElementById('pepe').style.color = valor;
}

function area() {
var	valor = document.getElementById("gremio").value;
if (valor == "Compras") {
document.getElementById('compras').style.display = "list-item";
document.getElementById('compras1').style.display = "list-item";
document.getElementById('compras2').style.display = "list-item";
}
if (valor == "Variedades") {
document.getElementById('Variedades').style.display = "list-item";
document.getElementById('Variedades1').style.display = "list-item";
document.getElementById('Variedades2').style.display = "list-item";
document.getElementById('Variedades3').style.display = "list-item";
document.getElementById('Variedades4').style.display = "list-item";
}
if (valor == "comidas") {
document.getElementById('Comidas').style.display = "list-item";
document.getElementById('Comidas1').style.display = "list-item";
document.getElementById('Comidas2').style.display = "list-item";
document.getElementById('Comidas3').style.display = "list-item";
document.getElementById('Comidas4').style.display = "list-item";
document.getElementById('Comidas5').style.display = "list-item";
}
if (valor == "Hospedaje") {
document.getElementById('Hospedaje').style.display = "list-item";
document.getElementById('Hospedaje1').style.display = "list-item";
document.getElementById('Hospedaje2').style.display = "list-item";
}
if (valor == "Entretenimiento") {
document.getElementById('Entretenimiento').style.display = "list-item";
document.getElementById('Entretenimiento1').style.display = "list-item";
document.getElementById('Entretenimiento2').style.display = "list-item";
document.getElementById('Entretenimiento3').style.display = "list-item";
document.getElementById('Entretenimiento4').style.display = "list-item";
document.getElementById('Entretenimiento5').style.display = "list-item";
document.getElementById('Entretenimiento6').style.display = "list-item";
}
if (valor == "Construccion") {
document.getElementById('Construccion').style.display = "list-item";
document.getElementById('Construccion1').style.display = "list-item";
document.getElementById('Construccion2').style.display = "list-item";
}
if (valor == "FincaRaiz") {
document.getElementById('FincaRaiz').style.display = "list-item";
document.getElementById('FincaRaiz1').style.display = "list-item";
document.getElementById('FincaRaiz2').style.display = "list-item";
}
if (valor == "Belleza") {
document.getElementById('Belleza').style.display = "list-item";
document.getElementById('Belleza1').style.display = "list-item";
document.getElementById('Belleza2').style.display = "list-item";
document.getElementById('Belleza3').style.display = "list-item";
document.getElementById('Belleza4').style.display = "list-item";
document.getElementById('Belleza5').style.display = "list-item";
}
if (valor == "Artesanias") {
document.getElementById('Artesanias').style.display = "list-item";
}
if (valor == "Recreacion") {
document.getElementById('Recreacion').style.display = "list-item";
}
if (valor == "Transporte") {
document.getElementById('Transporte').style.display = "list-item";
document.getElementById('Transporte1').style.display = "list-item";
document.getElementById('Transporte2').style.display = "list-item";
document.getElementById('Transporte3').style.display = "list-item";
}
}
function depa() {
var	valor = document.getElementById("departamento").value;
if (valor == "cundinamarca"  ) {
		document.getElementById('ciudada').style.display = "list-item";
	for (var i = 1 ; i <= 113; i++) {
		document.getElementById('ciudada'+i).style.display = "list-item";
	}
}
if (valor == "bogota" ) {
	document.getElementById('ciudadd1').style.display = "list-item";
	for (var i = 1 ; i <= 7; i++) {
		document.getElementById('ciudadd1'+i).style.display = "list-item";
	}
}
if (valor == "amazonas" ) {
	document.getElementById('ciudad2').style.display = "list-item";
	for (var i = 1 ; i <= 18; i++) {
		document.getElementById('ciudad2'+i).style.display = "list-item";
	}
}
if (valor == "antioquia" ) {
	document.getElementById('ciudad3').style.display = "list-item";
	for (var i = 1 ; i <= 137; i++) {
		document.getElementById('ciudad3'+i).style.display = "list-item";
	}
}
if (valor == "arauca" ) {
document.getElementById('ciudad4').style.display = "list-item";
	for (var i = 1 ; i <= 37; i++) {
		document.getElementById('ciudad4'+i).style.display = "list-item";
	}
}
if (valor == "atlantico" ) {
document.getElementById('ciudad5').style.display = "list-item";
	for (var i = 1 ; i <= 49; i++) {
		document.getElementById('ciudad5'+i).style.display = "list-item";
	}
}
if (valor == "bolivar" ) {
	document.getElementById('ciudad6').style.display = "list-item";
	for (var i = 1 ; i <= 127; i++) {
		document.getElementById('ciudad6'+i).style.display = "list-item";
	}
}
if (valor == "boyaca" ) {
		document.getElementById('ciudad7').style.display = "list-item";
	for (var i = 1 ; i <= 117; i++) {
		document.getElementById('ciudad7'+i).style.display = "list-item";
	}
}
if (valor == "caldas" ) {
	document.getElementById('ciudad8').style.display = "list-item";

	for (var i = 1 ; i <= 27; i++) {
		document.getElementById('ciudad8'+i).style.display = "list-item";
	}
}

if (valor == "caqueta" ) {
	document.getElementById('ciudad9').style.display = "list-item";
	for (var i = 1 ; i <= 22; i++) {
		document.getElementById('ciudad9'+i).style.display = "list-item";
	}
}
if (valor == "casanare" ) {
	document.getElementById('ciudad10').style.display = "list-item";
		for (var i = 1 ; i <= 20; i++) {
		document.getElementById('ciudad10'+i).style.display = "list-item";
	}
}
if (valor == "cauca" ) {
	document.getElementById('ciudad11').style.display = "list-item";
		for (var i = 1 ; i <= 74; i++) {
		document.getElementById('ciudad11'+i).style.display = "list-item";
	}
}
if (valor == "cesar" ) {
	document.getElementById('ciudad12').style.display = "list-item";
		for (var i = 1 ; i <= 32; i++) {
		document.getElementById('ciudad12'+i).style.display = "list-item";
	}
}
if (valor == "choco" ) {
	document.getElementById('ciudad13').style.display = "list-item";
		for (var i = 1 ; i <= 18; i++) {
		document.getElementById('ciudad13'+i).style.display = "list-item";
	}
}
if (valor == "cordoba" ) {
	document.getElementById('ciudad14').style.display = "list-item";
		for (var i = 1 ; i <= 28; i++) {
		document.getElementById('ciudad14'+i).style.display = "list-item";
	}
}
if (valor == "guainia" ) {
	document.getElementById('ciudad15').style.display = "list-item";
		for (var i = 1 ; i <= 3; i++) {
		document.getElementById('ciudad15'+i).style.display = "list-item";
	}
}
if (valor == "guaviare" ) {
document.getElementById('ciudad16').style.display = "list-item";
		for (var i = 1 ; i <= 6; i++) {
		document.getElementById('ciudad16'+i).style.display = "list-item";
	}
}
if (valor == "huila" ) {
		for (var i = 1 ; i <= 48; i++) {
		document.getElementById('ciudad17'+i).style.display = "list-item";
	}
}
if (valor == "magdalena" ) {
for (var i = 1 ; i <= 24; i++) {
		document.getElementById('ciudad18'+i).style.display = "list-item";
	}
}
if (valor == "meta" ) {
for (var i = 1 ; i <= 24; i++) {
		document.getElementById('ciudad19'+i).style.display = "list-item";
	}
}
if (valor == "nariño" ) {
for (var i = 1 ; i <= 85; i++) {
		document.getElementById('ciudad20'+i).style.display = "list-item";
	}
}
if (valor == "santamarta" ) {
document.getElementById('ciudad21').style.display = "list-item";
}
if (valor == "putumayo" ) {
for (var i = 1 ; i <= 14; i++) {
		document.getElementById('ciudad22'+i).style.display = "list-item";
	}
}
if (valor == "quindio" ) {
for (var i = 1 ; i <= 20; i++) {
		document.getElementById('ciudad23'+i).style.display = "list-item";
	}
}
if (valor == "sanandres" ) {
	for (var i = 1 ; i <= 92; i++) {
		document.getElementById('ciudad25'+i).style.display = "list-item";
	}
}
if (valor == "santander" ) {
	for (var i = 1 ; i <= 26; i++) {
		document.getElementById('ciudad27'+i).style.display = "list-item";
	}
}
if (valor == "tolima" ) {
	for (var i = 1 ; i <= 53; i++) {
		document.getElementById('ciudad28'+i).style.display = "list-item";
	}
}
if (valor == "valle" ) {
	for (var i = 1 ; i <= 120; i++) {
		document.getElementById('ciudad29'+i).style.display = "list-item";
	}
}
if (valor == "vaupes" ) {
document.getElementById('ciudad30').style.display = "list-item";
}
if (valor == "vichada" ) {
document.getElementById('ciudad31').style.display = "list-item";
}
if (valor == "guajira" ) {
document.getElementById('ciudad32').style.display = "list-item";
}
if (valor == "nsantander" ) {
	document.getElementById('ciudad32').style.display = "list-item";
		for (var i = 1 ; i <= 14; i++) {
		document.getElementById('ciudad32'+i).style.display = "list-item";
	}
}
}


function validacion() {
valor = document.getElementById("upload").value;
if( valor == null || valor.length == 0 || /^\s+$/.test(valor) ) {
	alert("te falto un valor")
  return false;
}
}


/*$(window).load(function() {



var h = getElementById('username')
alert("helado" + h)

});*/


// valudar y optener el valor de un campo       var valor = document.getElementById("texto").value;

//maximo d caractrs   
/*
function limita(maximoCaracteres) {
  var elemento = document.getElementById("texto");
  if(elemento.value.length >= maximoCaracteres ) {
    return false;
  }
  else {
    return true;
  }
}
*/

/* darle n valor a algo
    function fileOnload(e) {
      var result = e.target.result;
      $('#imgSalida').attr("src", result);
    }
*/