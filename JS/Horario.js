var tabla = document.getElementById('tblMaterias');
var tablaMaterias = document.getElementById('tblMateriasDisponibles');
var indiceColor = -1;
var esFechaHabil;
window.onload = function () {
    habilitarBotones();


}
function codigoFuncion() {
    var peticion = new XMLHttpRequest(); //Hacer petición a backend
    peticion.open('POST', 'http://mrsergiotorres17-001-site1.itempurl.com/api/VerMisMaterias');
    peticion.setRequestHeader('Authorization', 'Bearer ' + GetCookie('TknBrJk'));
    var parametros = new FormData(); //Poner parametros
    parametros.append('NombreAlumno', GetCookie('nameOfUser'));
    peticion.send(parametros); //Enviar petición
    peticion.onload = function () {
        var objJson = JSON.parse(peticion.responseText);
        var fila;
        var boton;
        var codigo;
        var dia;
        var hora;
        var materia;
        var profesor;
        objJson.forEach(element => {
            fila = tabla.insertRow();
            boton = fila.insertCell(0);
            codigo = fila.insertCell(1);
            dia = fila.insertCell(2);
            hora = fila.insertCell(3);
            materia = fila.insertCell(4);
            profesor = fila.insertCell(5);
            boton.innerHTML = '<button type="button" class="btn btn-danger">Baja</button>';
            codigo.innerHTML = '<div class="d-flex align-items-center"><div class="ms-3"><p class="fw-bold mb-1">' + element.codigoClase + '</p></div></div>';
            dia.innerHTML = element.dia;
            hora.innerHTML = '<span class="badge badge-success rounded-pill d-inline">' + element.horario + '</span>';
            materia.innerHTML = element.materia;
            profesor.innerHTML = element.profesor;
        });
    }
}


function codigoFuncionTabla2() {
    var peticion = new XMLHttpRequest(); //Hacer petición a backend
    peticion.open('GET', 'http://mrsergiotorres17-001-site1.itempurl.com/api/ClasesTotalVista');
    peticion.setRequestHeader('Authorization', 'Bearer ' + GetCookie('TknBrJk'));
    peticion.send(); //Enviar petición
    peticion.onload = function () {
        var objJson = JSON.parse(peticion.responseText);
        var fila;
        var boton;
        var materia;
        var aula;
        var dia;
        var hora;
        objJson.forEach(element => {
            fila = tablaMaterias.insertRow();
            boton = fila.insertCell(0)
            materia = fila.insertCell(1);
            aula = fila.insertCell(2);
            dia = fila.insertCell(3);
            hora = fila.insertCell(4);
            fila.className = obtenerColor();
            if (esFechaHabil === true) {
                boton.innerHTML = '<button type="button" class="btn btn-success">Alta</button>';
            }
            materia.innerHTML = element.materia;
            aula.innerHTML = element.aula;
            dia.innerHTML = element.dia;
            hora.innerHTML = element.horario;
        });
    }
}

function obtenerColor() {
    let arregloColores = ['table-primary', 'table-secondary', 'table-success', 'table-danger', 'table-warning'];
    if (indiceColor < 4) {
        indiceColor += 1;
    }
    else {
        indiceColor = 0;
    }
    return arregloColores[indiceColor];
}

function habilitarBotones() {
    var peticion = new XMLHttpRequest();
    peticion.open('GET', 'http://mrsergiotorres17-001-site1.itempurl.com/api/ViewFechasMovimientos?NombreMovimiento=Modificación horario alumnos');
    peticion.setRequestHeader('Authorization', 'Bearer ' + GetCookie('TknBrJk'));
    peticion.send(); //Enviar petición
    peticion.onload = function () {
        var objJson = JSON.parse(peticion.responseText);
        if (objJson.length > 0) {
            var fechaActual = new Date();
            var fechaInicio = new Date(objJson[0].fechaInicioHabil);
            var fechaFin = new Date(objJson[0].fechaFinHabil);
            console.log(fechaActual);
            console.log(fechaInicio);
            console.log(fechaFin);
            esFechaHabil = (fechaActual >= fechaInicio && fechaActual <= fechaFin);
            console.log(esFechaHabil);
        }
        else {
            esFechaHabil = false; console.log(esFechaHabil);
        }
        codigoFuncion();
        codigoFuncionTabla2();
    }
}

