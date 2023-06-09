/*****************************************************************************/
/********************************Gestion Aulas********************************/
var txtNuevaAula = document.getElementById('txtAulaNew');
var txtNuevoDiaClase = document.getElementById('txtDiaClaseNew');
var txtNuevoGrado = document.getElementById('txtgradoNew');


var tblAulas = document.getElementById('tableAula');
var tblDias = document.getElementById('tableDias');
var tblGrado = document.getElementById('tableGrados');


var btnRegistrar = document.getElementById('btnInsertarAula');
var btnRegistrarDiaClase = document.getElementById('btnInsertarDia');
var btnRegistrarGrado = document.getElementById('btnInsertarGrado');

var optionGrados = document.getElementById('optionGrado');
var json;

btnRegistrar.onclick = function () {
    if (txtNuevaAula.value.length > 0) {
        insertNewAula();    
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Campo vacío',
            text: 'Debe de ingresar el nombre del día',
          });
    }
    
}
btnRegistrarDiaClase.onclick = function(){
    if (txtNuevoDiaClase.value.length > 0) {
        insertNewDiaClase();
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Campo vacío',
            text: 'Debe de ingresar el nombre del día',
          });
    }
    
}
btnRegistrarGrado.onclick = function(){
    if (txtNuevoGrado.value.length > 0) {
        insertNewGrado();
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Campo vacío',
            text: 'Debe de ingresar el nombre del día',
          });
    }
}
function deleteTable() {
    var rowCount = tblAulas.rows.length;
    for (var x = rowCount - 1; x > 0; x--) {
        tblAulas.deleteRow(x);
    }
}
function deleteTableGeneric(tabla) {
    var rowCount = tabla.rows.length;
    for (var x = rowCount - 1; x > 0; x--) {
        tabla.deleteRow(x);
    }
}
function loadExistClasses() {
    var reqAulas = new XMLHttpRequest();
    reqAulas.open('GET', MASTER_SERVER+'/api/VisorAulas');
    reqAulas.setRequestHeader('Authorization', 'Bearer ' + GetCookie('TknBrJk'));
    reqAulas.send();
    var fila;
    var celda;
    var aulaEstatusTexto = '';
    var fecha;
    reqAulas.onload = function () {
        json = JSON.parse(reqAulas.responseText);
        deleteTable();
        json.forEach(element => {
            fecha = new Date(element.fechaInsercion);
            fila = tblAulas.insertRow();
            //Celda nombre aula
            aulaEstatusTexto = 'Aula actualmente ' + (element.active ? 'Activa' : 'Inactiva')
            celda = fila.insertCell(0);
            celda.innerHTML = '<div class="d-flex align-items-center"><img src="../IMG/claseIcono.jpg" alt=""style="width: 65px; height: 65px" class="rounded-circle" /><div class="ms-3"><p class="fw-bold mb-1"> Aula '
                + element.nombre + '</p><p class="text-muted mb-0">' + aulaEstatusTexto + '</p> </div></div>';
            //Celda fecha insercion
            celda = fila.insertCell(1);
            celda.innerHTML = '<p class="fw-normal mb-1">' + fecha.toLocaleDateString('es-MX') + '</p>';
            //Celda Boton estatus
            celda = fila.insertCell(2);
            celda.innerHTML = (element.active ? '<button type="button" class="btn btn-danger" onclick="controlMateria(this);">Desactivar</button>' : '<button type="button" class="btn btn-success" onclick="controlMateria(this);">Activar</button>');

        });
    }
}
function insertNewAula() {
    var reqInsertAulas = new XMLHttpRequest();
    var form = new FormData();
    reqInsertAulas.open('POST', MASTER_SERVER+'/api/aula');
    reqInsertAulas.setRequestHeader('Authorization', 'Bearer ' + GetCookie('TknBrJk'));
    form.append('NombreAula', txtNuevaAula.value);
    reqInsertAulas.send(form);
    reqInsertAulas.onload = function () {
        var objRespuesta = JSON.parse(reqInsertAulas.responseText);
        if (objRespuesta.rsp == 0) {
            swal.fire({
                title: 'Aula registrada correctamente',
                text: objRespuesta.msg,
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then((result) => {
                if (result.isConfirmed) {
                    loadExistClasses();
                    txtNuevaAula.value = '';
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: objRespuesta.msg,
            });
        }
    }
}
function controlMateria(prms) {
    let currenElement = prms;
    let textoBoton = currenElement.textContent;
    let nombreAula = currenElement.parentElement.parentElement.querySelector('div').querySelector('div').querySelector('p').textContent.replace('Aula ', '').trim();
    Swal.fire({
        title: '¿Seguro que quieres ' + (textoBoton === 'Desactivar' ? "desactivar" : "activar") + ' el aula "' + nombreAula + '"?',
        icon: 'question',
        showDenyButton: true,
        confirmButtonText: 'Sí',
    }).then((result) => {
        if (result.isConfirmed) {
            if(textoBoton === 'Desactivar'){
                desactivarAula(nombreAula);
            }else{
                activarAula(nombreAula);
            }
        } else if (result.isDenied) {
            Swal.fire('Movimiento cancelado', '', 'error')
        }
    })

}
function desactivarAula(nombreAula) {
    var requestChange = new XMLHttpRequest();
    var data = new FormData();
    requestChange.open('POST', MASTER_SERVER+'/api/DesactivarAula');
    requestChange.setRequestHeader('Authorization', 'Bearer ' + GetCookie('TknBrJk'));
    data.append('NombreAula', nombreAula);
    requestChange.send(data);
    requestChange.onload = function () {
        var resp = JSON.parse(requestChange.responseText);
        Swal.fire((resp.rsp == 0) ? 'Proceso terminado' : 'Error', (resp.rsp == 0) ? 'Proceso completado correctamente' : 'El proceso ha fallado', (resp.rsp == 0) ? 'success' : 'error')
    }
}
function activarAula(nombreAula){
    var requestChange = new XMLHttpRequest();
    var data = new FormData();
    requestChange.open('POST', MASTER_SERVER+'/api/ActivarAula');
    requestChange.setRequestHeader('Authorization', 'Bearer ' + GetCookie('TknBrJk'));
    data.append('NombreAula', nombreAula);
    requestChange.send(data);
    requestChange.onload = function () {
        var resp = JSON.parse(requestChange.responseText);
        Swal.fire((resp.rsp == 0) ? 'Proceso terminado' : 'Error', (resp.rsp == 0) ? 'Proceso completado correctamente' : 'El proceso ha fallado', (resp.rsp == 0) ? 'success' : 'error')
    }
}
/*****************************************************************************/
/********************************Gestion Aulas********************************/
/*****************************************************************************/
function loadExistDiaClase() {
    var reqAulas = new XMLHttpRequest();
    reqAulas.open('GET', MASTER_SERVER+'/api/VisorDiasClase');
    reqAulas.setRequestHeader('Authorization', 'Bearer ' + GetCookie('TknBrJk'));
    reqAulas.send();
    var fila;
    var celda;
    var aulaEstatusTexto = '';
    var fecha;
    reqAulas.onload = function () {
        json = JSON.parse(reqAulas.responseText);
        deleteTableGeneric(tblDias);
        json.forEach(element => {
            fecha = new Date(element.fechaInsercion);
            fila = tblDias.insertRow();
            //Celda nombre aula
            aulaEstatusTexto = 'Dia actualmente ' + (element.active ? 'Activo' : 'Inactivo')
            celda = fila.insertCell(0);
            celda.innerHTML = '<div class="d-flex align-items-center"><img src="../IMG/claseIcono.jpg" alt=""style="width: 65px; height: 65px" class="rounded-circle" /><div class="ms-3"><p class="fw-bold mb-1">'
                + element.nombre + '</p><p class="text-muted mb-0">' + aulaEstatusTexto + '</p> </div></div>';
            //Celda fecha insercion
            celda = fila.insertCell(1);
            celda.innerHTML = '<p class="fw-normal mb-1">' + fecha.toLocaleDateString('es-MX') + '</p>';
            //Celda Boton estatus
            celda = fila.insertCell(2);
            celda.innerHTML = (element.active ? '<button type="button" class="btn btn-danger" onclick="controlDiaClase(this);">Desactivar</button>' : '<button type="button" class="btn btn-success" onclick="controlDiaClase(this);">Activar</button>');

        });
        loadExistGrado();
    }
}
function controlDiaClase(params) {
    let currenElement = params;
    let textoBoton = currenElement.textContent;
    let nombreDia = currenElement.parentElement.parentElement.querySelector('div').querySelector('div').querySelector('p').textContent.trim();
    Swal.fire({
        title: '¿Seguro que quieres ' + (textoBoton === 'Desactivar' ? "desactivar" : "activar") + ' el dia de clase "' + nombreDia + '"?',
        icon: 'question',
        showDenyButton: true,
        confirmButtonText: 'Sí',
    }).then((result) => {
        if (result.isConfirmed) {
            if(textoBoton === 'Desactivar'){
                desactivarDiaClase(nombreDia);
            }else{
                activarDiaClase(nombreDia);
            }
        } else if (result.isDenied) {
            Swal.fire('Movimiento cancelado', '', 'error')
        }
    })

}
function activarDiaClase(nombreAula){
    var requestChange = new XMLHttpRequest();
    var data = new FormData();
    requestChange.open('POST', MASTER_SERVER+'/api/ActivarDiaClase');
    requestChange.setRequestHeader('Authorization', 'Bearer ' + GetCookie('TknBrJk'));
    data.append('DiaClase', nombreAula);
    requestChange.send(data);
    requestChange.onload = function () {
        var resp = JSON.parse(requestChange.responseText);
        console.log('Respuesta '+requestChange.responseText);
        Swal.fire((resp.rsp == 0) ? 'Proceso terminado' : 'Error', (resp.rsp == 0) ? 'Proceso completado correctamente' : 'El proceso ha fallado', (resp.rsp == 0) ? 'success' : 'error')
        deleteTableGeneric(tblDias);
        loadExistDiaClase();
    }
}
function desactivarDiaClase(nombreAula){
    var requestChange = new XMLHttpRequest();
    var data = new FormData();
    requestChange.open('POST', MASTER_SERVER+'/api/DesactivarDiaClase');
    requestChange.setRequestHeader('Authorization', 'Bearer ' + GetCookie('TknBrJk'));
    data.append('DiaClase', nombreAula);
    requestChange.send(data);
    requestChange.onload = function () {
        var resp = JSON.parse(requestChange.responseText);
        Swal.fire((resp.rsp == 0) ? 'Proceso terminado' : 'Error', (resp.rsp == 0) ? 'Proceso completado correctamente' : 'El proceso ha fallado', (resp.rsp == 0) ? 'success' : 'error');
        deleteTableGeneric(tblDias);
        loadExistDiaClase();
        
    }
}
function insertNewDiaClase() {
    var reqInsertAulas = new XMLHttpRequest();
    var form = new FormData();
    reqInsertAulas.open('POST', MASTER_SERVER+'/api/InsertarDiaClase');
    reqInsertAulas.setRequestHeader('Authorization', 'Bearer ' + GetCookie('TknBrJk'));
    form.append('DiaClase', txtNuevoDiaClase.value);
    reqInsertAulas.send(form);
    reqInsertAulas.onload = function () {
        var objRespuesta = JSON.parse(reqInsertAulas.responseText);
        if (objRespuesta.rsp == 0) {
            swal.fire({
                title: 'Aula registrada correctamente',
                text: objRespuesta.msg,
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteTableGeneric(tblDias);
                    loadExistDiaClase();
                    txtNuevoDiaClase.value = '';
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: objRespuesta.msg,
            });
        }
    }
}
/*****************************************************************************/
/********************************Gestion Dias de clase********************************/
function loadExistGrado() {
    var reqAulas = new XMLHttpRequest();
    reqAulas.open('GET', MASTER_SERVER+'/api/VisorDeGrados');
    reqAulas.setRequestHeader('Authorization', 'Bearer ' + GetCookie('TknBrJk'));
    console.log('Token antes de peticion ' + GetCookie('TknBrJk'));
    reqAulas.send();
    var fila;
    var celda;
    var aulaEstatusTexto = '';
    var fecha;
    reqAulas.onload = function () {
        json = JSON.parse(reqAulas.responseText);
        json.forEach(element => {
            fecha = new Date(element.fechaInsercion);
            fila = tblGrado.insertRow();
            //Celda nombre aula
            aulaEstatusTexto = 'Grado actualmente ' + (element.active ? 'Activo' : 'Inactivo')
            celda = fila.insertCell(0);
            celda.innerHTML = '<div class="d-flex align-items-center"><img src="../IMG/claseIcono.jpg" alt=""style="width: 65px; height: 65px" class="rounded-circle" /><div class="ms-3"><p class="fw-bold mb-1">'
                + element.nombre + '</p><p class="text-muted mb-0">' + aulaEstatusTexto + '</p> </div></div>';
            //Celda fecha insercion
            celda = fila.insertCell(1);
            celda.innerHTML = '<p class="fw-normal mb-1">' + fecha.toLocaleDateString('es-MX') + '</p>';
            //Celda Boton estatus
            celda = fila.insertCell(2);
            celda.innerHTML = (element.active ? '<button type="button" class="btn btn-danger" onclick="controlGrado(this);">Desactivar</button>' : '<button type="button" class="btn btn-success" onclick="controlGrado(this);">Activar</button>');

        });
        
    loadExistClasses();
    }
}
function controlGrado(params) {
    let currenElement = params;
    let textoBoton = currenElement.textContent;
    console.log('Texto Boton: ' + textoBoton)
    let nombreGrado = currenElement.parentElement.parentElement.querySelector('div').querySelector('div').querySelector('p').textContent.trim();
    console.log('Nombre grado'+nombreGrado)
    Swal.fire({
        title: '¿Seguro que quieres ' + (textoBoton === 'Desactivar' ? "desactivar" : "activar") + ' el dia de clase "' + nombreGrado + '"?',
        icon: 'question',
        showDenyButton: true,
        confirmButtonText: 'Sí',
    }).then((result) => {
        if (result.isConfirmed) {
            if(textoBoton === 'Desactivar'){
                desactivarGrado(nombreGrado);
            }else{
                activarGrado(nombreGrado);
            }
        } else if (result.isDenied) {
            Swal.fire('Movimiento cancelado', '', 'error')
        }
    })

}
function activarGrado(nombreGrado){
    var requestChange = new XMLHttpRequest();
    var data = new FormData();
    requestChange.open('POST', MASTER_SERVER+'/api/ActivarGrado');
    requestChange.setRequestHeader('Authorization', 'Bearer ' + GetCookie('TknBrJk'));
    data.append('NombreGrado', nombreGrado);
    requestChange.send(data);
    requestChange.onload = function () {
        var resp = JSON.parse(requestChange.responseText);
        console.log('Respuesta '+requestChange.responseText);
        Swal.fire((resp.rsp == 0) ? 'Proceso terminado' : 'Error', (resp.rsp == 0) ? 'Proceso completado correctamente' : 'El proceso ha fallado', (resp.rsp == 0) ? 'success' : 'error')
        deleteTableGeneric(tblGrado);
        sleepFor(5000);
        loadExistGrado();
    }
}
function desactivarGrado(nombreGrado){
    var requestChange = new XMLHttpRequest();
    var data = new FormData();
    requestChange.open('POST', MASTER_SERVER+'/api/DesactivarGrado');
    
    requestChange.setRequestHeader('Authorization', 'Bearer ' + GetCookie('TknBrJk'));
    data.append('NombreGrado', nombreGrado);
    requestChange.send(data);
    requestChange.onload = function () {
        var resp = JSON.parse(requestChange.responseText);
        console.log(requestChange.responseText);
        Swal.fire((resp.rsp == 0) ? 'Proceso terminado' : 'Error', (resp.rsp == 0) ? 'Proceso completado correctamente' : 'El proceso ha fallado', (resp.rsp == 0) ? 'success' : 'error');
        deleteTableGeneric(tblGrado);
        sleepFor(5000);
        loadExistGrado();
        
    }
}
function insertNewGrado() {
    var reqInsertAulas = new XMLHttpRequest();
    var form = new FormData();
    reqInsertAulas.open('POST', MASTER_SERVER+'/api/InsertarGrado');
    reqInsertAulas.setRequestHeader('Authorization', 'Bearer ' + GetCookie('TknBrJk'));
    form.append('NombreGrado', txtNuevoGrado.value);
    reqInsertAulas.send(form);
    reqInsertAulas.onload = function () {
        var objRespuesta = JSON.parse(reqInsertAulas.responseText);
        console.log(reqInsertAulas.responseText);
        if (objRespuesta.rsp == 0) {
            swal.fire({
                title: 'Grado registrada correctamente',
                text: objRespuesta.msg,
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteTableGeneric(tblGrado);
                    loadExistGrado();
                    txtNuevoGrado.value = '';
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: objRespuesta.msg,
            });
        }
    }
}
/******************************Control de materias******************************/
function leerGradosRegistrado(){
    var requestMaterias = new XMLHttpRequest();
    requestMaterias.open('GET',  MASTER_SERVER+'/api/VisorDeGrados');
    requestMaterias.setRequestHeader('Authorization', 'Bearer '+ GetCookie('TknBrJk'))
    requestMaterias.send();
    requestMaterias.onload = function(){
        var json = JSON.parse(requestMaterias.responseText);
        let newOption;
        json.forEach(element => {
            newOption = document.createElement('option');
            newOption.textContent = element.nombre;
            optionGrados.appendChild(newOption);
        });
    }
}
function sleepFor(sleepDuration){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ 
        /* Do nothing */ 
    }
}
/**Main Module**/
window.onload = function () {
    sleepFor(5000);
    loadExistDiaClase();
    leerGradosRegistrado();
}