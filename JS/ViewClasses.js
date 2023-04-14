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

makeCode();

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

function countListStudents(){
  var reque = new XMLHttpRequest();
  reque.open('GET','./php/temp/prdTemp.json');
  reque.send();
  reque.onload = function(){
    var students = JSON.parse(reque.responseText);
    console.log(reque.responseText);
    lbl.innerHTML = 'Numero de alumnos con asistencia: '+students.length.toString();
    console.log('Numero de alumnos con asistencia: '+students.length.toString());
    students = '';
  }
}
var intervalId = window.setInterval(function(){
  countListStudents();
}, 2000);
