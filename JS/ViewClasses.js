//Variables for container
var roomClass;
var divMain = document.getElementById('mainContainer');
var template;
/*
var qrcode = new QRCode("qrcode");
var lbl = document.getElementById('lblConteo');
function makeCode () {    
  var elText = document.getElementById("text");
  
  if (!elText.value) {
    alert("Input a text");
    elText.focus();
    return;
  }
  
  qrcode.makeCode(elText.value);
}
$("#text").
  on("blur", function () {
    makeCode();
  }).
  on("keydown", function (e) {
    console.log(e.keyCode);
    if (e.keyCode == 13) {
      makeCode();
    }
  });

*/
/*var intervalId = window.setInterval(function(){
  countListStudents();
}, 2000);*/

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

/****************Template Open Class****************/
function loadTemplateOpenClass(){
  template = document.getElementById('tmlOpenClass');
  const clone = template.content.cloneNode(true);
  divMain.append(clone);
}
function loadClassRooms() {
  document.coo
}
/****************Template Open Class****************/
//Generic
function mainMethod(){
  roomClass = GetCookie('nameRoomClass');
  if(roomClass != null){
    
  }else{
    loadTemplateOpenClass();
    console.log('No existe Cookie');
  }
}
window.onload=function() {
  mainMethod();
}