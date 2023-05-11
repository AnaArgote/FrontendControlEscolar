var tabla = document.getElementById('tblMaterias');
var tablaMaterias = document.getElementById('tblMateriasDisponibles');
var indiceColor = 0;
function codigoFuncion(){
    var peticion = new XMLHttpRequest(); //Hacer petición a backend
    peticion.open('POST', 'http://mrsergiotorres17-001-site1.itempurl.com/api/VerMisMaterias');
    peticion.setRequestHeader('Authorization', 'Bearer '+ GetCookie('TknBrJk'));
    var parametros = new FormData(); //Poner parametros
    parametros.append('NombreAlumno', GetCookie('nameOfUser'));
    peticion.send(parametros); //Enviar petición
    peticion.onload = function(){
        var objJson = JSON.parse(peticion.responseText);
        var fila;
        var codigo;
        var dia;
        var hora;
        var materia;
        var profesor;
        objJson.forEach(element => {
            fila = tabla.insertRow();
            codigo = fila.insertCell(0);
            dia = fila.insertCell(1);
            hora = fila.insertCell(2);
            materia = fila.insertCell(3);
            profesor = fila.insertCell(4);
            codigo.innerHTML = '<div class="d-flex align-items-center"><div class="ms-3"><p class="fw-bold mb-1">'+ element.codigoClase+'</p></div></div>';
            dia.innerHTML = element.dia;
            hora.innerHTML = '<span class="badge badge-success rounded-pill d-inline">'+ element.horario+'</span>';
            materia.innerHTML = element.materia;
            profesor.innerHTML = element.profesor;
        });
    }
}


function codigoFuncionTabla2(){
    var peticion = new XMLHttpRequest(); //Hacer petición a backend
    peticion.open('GET', 'http://mrsergiotorres17-001-site1.itempurl.com/api/ClasesTotalVista');
    peticion.setRequestHeader('Authorization', 'Bearer '+ GetCookie('TknBrJk'));
    peticion.send(); //Enviar petición
    peticion.onload = function(){
        var objJson = JSON.parse(peticion.responseText);
        var fila;
        var materia;
        var aula;
        var dia;
        var hora;
        objJson.forEach(element => {
            fila = tablaMaterias.insertRow();
            materia = fila.insertCell(0);
            aula = fila.insertCell(1);
            dia = fila.insertCell(2);
            hora = fila.insertCell(3);
            fila.className = obtenerColor();
            materia.innerHTML = element.materia;
            aula.innerHTML = element.aula;
            dia.innerHTML = element.dia;
            hora.innerHTML = element.horario;
        });
    }
}

function obtenerColor(){
    let arregloColores = ['table-primary','table-secondary', 'table-success', 'table-danger', 'table-warning'];
    if (indiceColor <= arregloColores.length){
        indiceColor+=1;
    }
    else{
        indiceColor = 0;
    }
    return arregloColores[indiceColor];
}
codigoFuncion();
codigoFuncionTabla2();