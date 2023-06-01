var tabla = document.getElementById('tblMaterias');
var tablaMaterias = document.getElementById('tblMateriasDisponibles');
var indiceColor = -1;
var esFechaHabil;

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
            if (esFechaHabil === true) {
                boton.innerHTML = '<button type="button" class="btn btn-danger" onClick="BajaClase(this)">Baja</button>';
            }
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
    peticion.open('GET', 'http://mrsergiotorres17-001-site1.itempurl.com/api/ClasesTotalVista?NombreAlumno=' + GetCookie('nameOfUser'));
    peticion.setRequestHeader('Authorization', 'Bearer ' + GetCookie('TknBrJk'));
    peticion.send(); //Enviar petición
    peticion.onload = function () {
        var objJson = JSON.parse(peticion.responseText);
        var fila;
        var boton;
        var codigoClase;
        var dia;
        var hora;
        var materia;
        var profesor;
        var aula;
        objJson.forEach(element => {
            fila = tablaMaterias.insertRow();
            boton = fila.insertCell(0);
            codigoClase = fila.insertCell(1);
            dia = fila.insertCell(2);
            hora = fila.insertCell(3);
            materia = fila.insertCell(4);
            profesor = fila.insertCell(5);
            aula = fila.insertCell(6);
            fila.className = obtenerColor();
            if (esFechaHabil === true) {
                boton.innerHTML = '<button type="button" class="btn btn-success" onClick="altaClase(this)">Alta</button>';
            }
            codigoClase.innerHTML = '<label>' + element.codigoClase + '</label>';
            dia.innerHTML = element.dia;
            hora.innerHTML = element.horario;
            materia.innerHTML = element.materia;
            profesor.innerHTML = element.profesor;
            aula.innerHTML = element.aula;

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
function BajaClase(currentButton) {
    var textoBoton = currentButton.parentElement.querySelector('button').textContent;
    var codigoClase = currentButton.parentElement.parentElement.querySelector('p').textContent;
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Está segur@ que quiere dar de baja esta materia ' + codigoClase + '?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, dar de baja',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            darBajaClase(codigoClase);
            swalWithBootstrapButtons.fire(
                'Proceso completado!',
                'Te haz dado de baja de la materia ' + codigoClase,
                'success'
            )
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelado',
                'El proceso ha sido cancelado',
                'error'
            )
        }
    })
}
function altaClase(currentButton) {
    var codigoClase = currentButton.parentElement.parentElement.querySelector('label').textContent;
    var textoBoton = currentButton.textContent;
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Está segur@ que quiere dar de alta esta materia ' + codigoClase + '?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, dar de alta!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            darAltaClase(codigoClase);
           
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelado',
                'El proceso ha sido cancelado',
                'error'
            )
        }
    })

}
function darAltaClase(CodigoClase) {
    var peticion = new XMLHttpRequest();
    peticion.open('POST', 'http://mrsergiotorres17-001-site1.itempurl.com/api/RegistrarAlumnoClase');
    peticion.setRequestHeader('Authorization', 'Bearer ' + GetCookie('TknBrJk'));
    var parametros = new FormData(); //Poner parametros
    parametros.append('NombreAlumno', GetCookie('nameOfUser'));
    parametros.append('CodigoClase', CodigoClase);
    peticion.send(parametros); //Enviar petición
    peticion.onload = function () {
        var respuesta = JSON.parse(peticion.responseText);
        console.log(respuesta);
        Swal.fire(
            (respuesta[0].rsp === 0)?'Proceso completado!':'Error',
            respuesta[0].msg + CodigoClase,
            (respuesta[0].rsp === 0)?'success':'error'
          ).then((result) => {
            if(result.isConfirmed){
                window.location.reload();
            }
          })    
          
    }

}
function darBajaClase(CodigoAlumno) {
    var peticion = new XMLHttpRequest();
    peticion.open('POST', 'http://mrsergiotorres17-001-site1.itempurl.com/api/BajaAlumnoDeClase');
    peticion.setRequestHeader('Authorization', 'Bearer ' + GetCookie('TknBrJk'));
    var parametros = new FormData(); //Poner parametros
    parametros.append('NombreAlumno', GetCookie('nameOfUser'));
    parametros.append('CodigoAlumno', CodigoAlumno);
    parametros.append('RazonBaja', 'Solicitada por alumno');
    peticion.send(parametros); //Enviar petición
    peticion.onload = function () {
        var respuesta = JSON.parse(peticion.responseText);
        console.log(respuesta);
        Swal.fire(
            (respuesta.rsp === 0)?'Proceso completado!':'Error',
            respuesta.msg + CodigoAlumno,
            (respuesta.rsp === 0)?'success':'error'
          ).then((result) => {
            if(result.isConfirmed){
                window.location.reload();
            }
          })
          
    }
}
habilitarBotones();

