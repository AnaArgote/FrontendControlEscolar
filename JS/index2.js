
window.onload = function () {
  console.log(GetCookie('nameOfUser'));
  if (GetCookie('userName') != null) {
    var listSections = document.getElementById('listMenu');
    var numNotifications = document.getElementById('numNotifications');
    var imgUser = document.getElementById('imgUser');
    var secciones = JSON.parse(GetCookie('sections'));
    crearMenu(secciones, listSections);
    txt = document.createTextNode('1');
    numNotifications.appendChild(txt);
    imgUser.src = 'data:image/png;base64,' + window.localStorage.getItem('img');
    console.log(window.localStorage.getItem('img'));
  } else {
    location.replace('Login.html');
  }
}
document.getElementById('btnLogOut').addEventListener('click', function () {
  DeleteCookie('TknBrJk');
  DeleteCookie('userName');
  location.href = 'index.html';
});

function crearMenu(jsonSections, listSection) {
  var li;
  var a;
  jsonSections.forEach(seccion => {
    li = document.createElement('li');
    a = document.createElement('a');
    //Initialize classes CSS
    li.className = 'nav-item';
    a.className = 'nav-link';
    //Creacion de ancla
    a.href = seccion.Referencia;
    a.innerHTML = seccion.NombreSeccion;
    li.appendChild(a);
    listSection.appendChild(li);
  });
}