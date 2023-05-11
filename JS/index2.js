
window.onload = loadInfo();
function loadInfo(){
  if (GetCookie('userName') != null) {
    var listSections = document.getElementById('listMenu');
    var numNotifications = document.getElementById('numNotifications');
    var imgUser = document.getElementById('imgUser');
    var secciones = JSON.parse(GetCookie('sections'));
    crearMenu(secciones, listSections);
    txt = document.createTextNode('1');
    numNotifications.appendChild(txt);
    imgUser.src = 'data:image/png;base64,' + window.localStorage.getItem('img');
    document.title = lanzarTituloPagina(GetCookie('typeOfUser'));
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
function lanzarTituloPagina(typeUser){
  let dev = '';
  switch (parseInt(typeUser)) {
    case 1000:{
      dev = 'Consola de administrador';
      break;
    }
    case 1150:{
      dev = 'Panel alumnos';
      break;
    }
    case 1050:{
      dev = 'Panel de profesores';
      break;
    }
    default:{
      dev = 'panel';
      break;
    }
  }
  console.log(dev);
    return dev;
}