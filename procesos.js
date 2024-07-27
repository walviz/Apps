
// limpiar el el btn guion y lo que esta en observaciones
const btnDeleteGuiones = document.getElementById('btnDeleteGuiones');
btnDeleteGuiones.addEventListener('click',()=>{
  document.getElementById("guiones").selectedIndex = "";
  document.getElementById("observaciones").value ="";
})


// eliminar espacios y :
limpiarEntrada(Caso);
limpiarEntrada(CC);
limpiarEntrada(IdLlamada);
limpiarEntrada(Celular);
limpiarEntrada(Legado);
limpiarEntrada(Legado2);
limpiarEntrada(switch1);
limpiarEntrada(NE);
function limpiarEntrada(input) {
  input.addEventListener("input", e => {
    let string = e.target.value;
    string = string.replace(/[ :	]/g, "");
    e.target.value = string;
  });
}

// funcion para evitar ctrl+s
document.addEventListener("keydown", function(event) {
  if (event.ctrlKey && event.key === "s") {
    event.preventDefault(); // evita el comportamiento predeterminado del navegador
    // código para guardar la información o enviarla al servidor
  }
});

// convertir a mayusculas
function mayus(e) {
  e.value = e.value.toUpperCase(); 
}

//fecha para gdi
function fecha(){
  var fecha = new Date();
  var year = fecha.getFullYear();
  var mes=fecha.getMonth()+1;
  var dia=diaFecha(fecha.getDate());
  navigator.clipboard.writeText(dia+"/0"+mes+"/"+year);
}

// con esta funcion el texto queda selecionado
function copyToClipBoard(parametro) {
  var texto = document.getElementById(parametro);
  texto.select();
  document.execCommand("copy");
  /*document.getElementById(idbt).innerHTML ="Copiado!";
  setTimeout(function(){
    document.getElementById(idbt).innerHTML =idparametro
  },400)*/
}

//borra un solo texto
function deliteTextbox(param,param2){
  document.getElementById(param).value = "";
  var input = document.getElementById(param);
  input.focus();
  document.getElementById(param2).value = "";
}

//borra todo
function borrarTodo(){
  var elementos= ["Caso","Nombre","IdLlamada","switch1","NE","Celular","Legado","CC","Legado2","observaciones","nota",];

  for(let i=0;i<elementos.length;i++){
    var item=elementos[i];
    document.getElementById(item).value = "";
  }
  document.getElementById("guiones").selectedIndex = "";
}

//generar
function capturarTodo() {
  let caso = document.getElementById("Caso").value;
  let llamada = document.getElementById("IdLlamada").value;
  let legado = document.getElementById("Legado").value;
  let gis = document.getElementById("Gis").value;
  let cc = document.getElementById("CC").value;
  let observaciones = document.getElementById("observaciones").value;
  let fecha = new Date();
  //enviar toda la informacion capturada  a la plantilla
  document.getElementById("plantilla").value =
    "\n" +
    "Fecha: " + converMonth(fecha.getMonth()) +"-" +diaFecha(fecha.getDate()) +"\n" +
    "ID GDI: " + caso + "\n" +
    "ID llamada: " +  llamada + "\n" +
    "ID servicio: " + legado +"\n" +
    "ID Gis: " +gis +"\n" +
    "Cedula: " +cc +"\n" +
    "Observaciones: " + observaciones + "\n" +
    "Login: Walvizva";
  copyToClipBoard("plantilla");
  document.getElementById("btGenerar").innerHTML ="Generado!";
  setTimeout(resGenerar,1000);
 
}

//funcion notificacion de copiado temporal
function resGenerar(){
  document.getElementById("btGenerar").innerHTML ="Generar"
}

function resMSS(){
  document.getElementById("btMssP").innerHTML ="MSS"
}


// capturar sintexto
function captura(parametro) {
  var codigoACopiar = document.getElementById(parametro);
  navigator.clipboard.writeText(codigoACopiar.value);
}

//convertir numero del mes en mes texto

function converMonth(mes){
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  return meses[mes];
}

function diaFecha (dia){
if(dia<10){
  return "0"+dia
}else{
  return dia
}
}

//para plantilla M6
function capturarTodoM6(){
  document.getElementById("btMssP").innerHTML ="Generado!";
  let caso = document.getElementById("Caso").value;
  let llamada = document.getElementById("IdLlamada").value;
  let legado = document.getElementById("Legado").value;
  let gis = document.getElementById("Gis").value;
  let cc = document.getElementById("CC").value;
  let fecha = new Date();
  document.getElementById("plantilla").value =
    "Fecha: " + converMonth(fecha.getMonth()) +"-" +diaFecha(fecha.getDate()) +"\n" +
    "ID GDI: " + caso + "\n" +
    "ID llamada: " +  llamada + "\n" +
    "ID servicio: " + legado +"\n" +
    "ID Gis: " +gis +"\n" +
    "Cedula: " +cc +"\n" +
    "Login: Walvizva";
    copyToClipBoard("plantilla");
    setTimeout(resMSS,1000);
}


//guiones CRs
function selecionCr(){
  let opcion = document.getElementById("gestionCr").value;

  switch(opcion){
    case "s":
      document.getElementById("notaCr").value ="";
      break; 
    case "0":
      document.getElementById("notaCr").value ="Incidencias Soporte Aplicaciones.NCA.Cumplir/ Cerrar pedido. Cerrar MSS - CRM - GTC";
      break;   
    case "1":
      document.getElementById("notaCr").value = "Incidencias Soporte Aplicaciones.NCA.Corrección Datos.Cargar pedido(s) a Click";
      break;
    case "2":
      document.getElementById("notaCr").value ="Incidencias Soporte Aplicaciones.NCA.Corrección Datos.Cargar pedido(s) a Click";
      break;
    
    default: false;
  }}


//guiones select
function selecion(){
  let opcion = document.getElementById("guiones").value;

  var input = document.getElementById("observaciones");

  switch(opcion){
    case "0":
      document.getElementById("observaciones").value ="La causa fue: "+"\n"+
"La solución fue: ";
      input.focus();
      break;   
    case "1":
      document.getElementById("observaciones").value = "Buen día, No se actualiza equipo porque no nos suministra cual es el equipo que sale en reemplazo del que entra, ya que cliente cuenta en oss con la misma cantidad de equipos  que la contratada ";
      copyToClipBoard("observaciones");
      break;

    default: false;
  }}


/*LocalStorage*/

// guardar datos en local storage
var btsave = document.getElementById("btSavePass");
btsave.addEventListener("click", savePass);

function savePass() {
  let savered = document.getElementById("passRed").value;
  let saveEda = document.getElementById("passEda").value;
  let saveEtp = document.getElementById("passEtp").value;
  let saveElite = document.getElementById("passElite").value;

  localStorage.setItem("red", savered);
  localStorage.setItem("eda", saveEda);
  localStorage.setItem("etp", saveEtp);
  localStorage.setItem("elite", saveElite);

  console.log(localStorage.getItem("red","eda","etp","elite"));
}

//cargar info en input de opciones
document.addEventListener("DOMContentLoaded", cargarValores);

function cargarValores() {
  var savedRed = localStorage.getItem("red");
  var saveEda = localStorage.getItem("eda");
  var saveEtp = localStorage.getItem("etp");
  var saveElite = localStorage.getItem("elite");

  if (savedRed) {
    document.getElementById("passRed").value = savedRed;
    
  }
  if (saveEda) {
    document.getElementById("passWts").value = saveEda;
    
  }
  if (saveEtp) {
    document.getElementById("passMss").value = saveEtp;
    
  }
  if (saveElite) {
    document.getElementById("passMss").value = saveElite;
    
  }
}


/*funcion asignar contrasenas a los botones*/

document.getElementById("btRed").addEventListener("click", () => asignarCopiar("red"));
document.getElementById("btEdatel").addEventListener("click", () => asignarCopiar("eda"));
document.getElementById("btEtp").addEventListener("click", () => asignarCopiar("etp"));
document.getElementById("btElite").addEventListener("click", () => asignarCopiar("elite"));



function asignarCopiar(valor) {
  var savedValue = localStorage.getItem(valor);
  if (savedValue) {
    navigator.clipboard.writeText(savedValue)
  }
}


const excepcion ={
  "Excepción - ActualizarInventarioCompletarBA_TOIP":"Incidencias Soporte Aplicaciones.NCA.Cumplir/ Cerrar pedido. Cerrar MSS - CRM - GTC",
  "Pedido con excepción Dom":"Incidencias Soporte Aplicaciones.NCA.Corrección Datos.Cargar pedido(s) a Click",
  "Excepción - ConsultarDatosGestionOrden":"Incidencias Soporte Aplicaciones.NCA.Corrección Datos.Cargar pedido(s) a Click"
}

const activaciones ={
  "Corregir ID Legado":"Activaciones Fijo.Cumplir/ Cerrar Pedido.Integración Plataformas.Legalización Servicios",
  "Error de facturación":"	Activaciones Fijo. Reconfiguracion.Open Reconfiguracion",
  "Legalizar cambio de numero":"Activaciones Fijo.Cumplir/ Cerrar Pedido.Integración Plataformas.Legalización Servicios",
  "Legalizar servicios":"Activaciones Fijo.Cumplir/ Cerrar Pedido.Integración Plataformas.Legalización Servicios",
  "No permite cerrar pedido":"	Activaciones Fijo.Cumplir/ Cerrar Pedido.Integración Plataformas.Legalización Servicios",
  "Portafolio mal migrado / Corregir marquilla de Redco a HFC":"	Activaciones Fijo.Cumplir/ Cerrar Pedido.Integración Plataformas.Legalización Servicios"
}


