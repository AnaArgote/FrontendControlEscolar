//Variables for container
var roomClass;
var selectionRoomClass;
var divMain = document.getElementById('mainContainer');
var templateAuthAdmin = document.getElementById('authAdmin');
var templateLoadClases = document.getElementById('tmlOpenClass');
var templateQrSpace = document.getElementById('tmlCodigoQr');
var jsonTodayClases;
var codeClass;

var qrcode = new QRCode("qrcode");
var lbl = document.getElementById('lblConteo');


function countListStudents(){
  var reque = new XMLHttpRequest();
  reque.open('GET','../php/temp/prdTemp.json');
  reque.send();
  reque.onload = function(){
    var students = JSON.parse(reque.responseText);
    console.log(reque.responseText);
    lbl.innerHTML = 'Numero de alumnos con asistencia: '+students.length.toString();
    console.log('Numero de alumnos con asistencia: '+students.length.toString());
    students = '';
  }
}
/****************Authenticate admin******************/
function loadTemplateAuthenticateAdmin(){
  templateAuthAdmin.style.display = 'block';
}
function loginAdmin(){
  var txtUsuario = document.getElementById('txtUserAdmin');
  var txtPassword = document.getElementById('txtPasswordAdmin');
  var request = new XMLHttpRequest();
  var prms = new FormData();
  prms.append('username', txtUsuario.value);
  prms.append('password', CryptoJS.SHA256(txtPassword.value));
  request.open('POST', MASTER_SERVER+'/api/Login');
  request.send(prms);
  request.onload = function(){
    var response = JSON.parse(request.responseText);
    SetCookie('tknAuth', response.token);
    SetCookie('ExistAuth', 1);
    if(response.rsp == 0 && response.userType == 1000){ 
      Swal.fire(
      'Correcto',
      'Autenticado correctamente',
      'success'
    )
      loadTemplateOpenClass();
    }else{
      Swal.fire(
        'Error',
        'Usuario o contraseña incorrectos',
        'error'
      )
    }
  }
}
/****************Template Open Class****************/
function loadClassRooms() {
  
  templateLoadClases.style.display = 'block';
}
function loadTemplateOpenClass(){
  templateAuthAdmin.style.display = 'none';
  templateLoadClases.style.display = 'block';
  loadExistingRoomClases();
}
function loadExistingRoomClases(){
  selectionRoomClass = document.getElementById('nombreAula');
  var requestRooms = new XMLHttpRequest();
  requestRooms.open('GET', MASTER_SERVER+'/api/VisorAulas');
  requestRooms.setRequestHeader('Authorization', 'Bearer '+GetCookie('tknAuth'));
  requestRooms.send();
  
  let optionObj = document.createElement('option');
  optionObj.text = optionObj.value = 'Selecciona una opción...';
  selectionRoomClass.appendChild(optionObj);
  requestRooms.onload = function(){
    console.log(requestRooms.responseText);
    var rooms = JSON.parse(requestRooms.responseText);  
    rooms.forEach(room => {
        optionObj = document.createElement('option');
        optionObj.text =  room.nombre;
        selectionRoomClass.appendChild(optionObj);
    });

}  
}
function saveRoomClassName() {
  if (selectionRoomClass.selectedIndex > 0) {
    saveFilesRoomClass();
  }else{
    Swal.fire({
      icon: 'error',
      title: '¡Error!',
      text: 'La opción seleccionada no es valida'
    });
  }
}
function saveFilesRoomClass(){
  var reqReadRoomClass = new XMLHttpRequest();
  reqReadRoomClass.open('GET', MASTER_SERVER+'/api/ConsultarClasesAula?Aula='+selectionRoomClass[selectionRoomClass.selectedIndex].text);
  reqReadRoomClass.setRequestHeader('Authorization', 'Bearer '+GetCookie('tknAuth'));
  console.log(GetCookie('tknAuth'));
  reqReadRoomClass.send();
  reqReadRoomClass.onload = function(){
    SetCookie('fileRefClassJson','../php/temp/Aula_'+selectionRoomClass[selectionRoomClass.selectedIndex].text+'.json');
    SetCookie('fileStudentsAtendence','../php/temp/Asistencia_'+selectionRoomClass[selectionRoomClass.selectedIndex].text+'.json');
    //cerrar vista actual y cargar template de qrqwertyuiop´+}sdfg
    templateLoadClases.style.display = 'none';
    openQrView();
  }
}
/****************Template Open Class****************/
/*******************************Template QR Code Class*******************************/

function makeCode () {    
  
  if (codeClass.length < 0) {
    return;
  }
  
  qrcode.makeCode(codeClass);
}

/*$("#text").
  on("blur", function () {
    makeCode();
  }).
  on("keydown", function (e) {
    console.log(e.keyCode);
    if (e.keyCode == 13) {
      makeCode();
    }
  });*/


var intervalId = window.setInterval(function(){
  countListStudents();
}, 2000);
function openQrView(){
  console.log('Open qr view');
  templateQrSpace.style.display = 'block';
  loadClasesFromJsonFile();
}
function loadClasesFromJsonFile(){
  var requestJsonFile = new XMLHttpRequest();
  infoClassesLoaded = GetCookie('fileRefClassJson');
  requestJsonFile.open('GET', infoClassesLoaded);
  requestJsonFile.send();
  requestJsonFile.onload = function(){
    jsonTodayClases = JSON.parse(requestJsonFile.responseText);
    jsonTodayClases=  jsonTodayClases.filter(x=>x.Dia === 'Martes');
    firstClass = jsonTodayClases[0];
    console.log(firstClass);
    codeClass = firstClass.IdClase;
    makeCode();
  }
}
/*******************************Template QR Code Class*******************************/
//Generic
function mainMethod(){
  /*DeleteCookie('ExistAuth');
  DeleteCookie('tknAuth');
  DeleteCookie('fileRefClassJson');*/
  infoClassesLoaded = GetCookie('fileRefClassJson');
  auth = GetCookie('ExistAuth');
  if(infoClassesLoaded != null){
    openQrView();
  }else{
    if(auth != null){
      loadTemplateOpenClass();
    }else{
      loadTemplateAuthenticateAdmin();
    }    
    
  }
}
window.onload=function() {
  var weekday = new Date().getDay();
  console.log('Dia de la semana '+getActualDay())
  mainMethod();
}