/*****************************************************************************/
/********************************Gestion Aulas********************************/
var txtNuevaAula = document.getElementById('txtAulaNew');
var btnRegistrar = document.getElementById('btnInsertarAula');
var tblAulas = document.getElementById('tableClases');
var json;

btnRegistrar.onclick = function(){
    insertNewAula();
}
function deleteTable() {
    var rowCount = tblAulas.rows.length;
    for (var x=rowCount-1; x>0; x--) {
        tblAulas.deleteRow(x);
    }
}
function loadExistClasses() {
    var reqAulas = new XMLHttpRequest();
    reqAulas.open('GET', MASTER_SERVER+'/api/VisorAulas');
    reqAulas.setRequestHeader('Authorization', 'Bearer '+GetCookie('TknBrJk'));
    reqAulas.send();
    var fila;
    var celda;
    var aulaEstatusTexto = '';
    var fecha;
    reqAulas.onload = function(){
        json = JSON.parse(reqAulas.responseText);
        deleteTable();
        json.forEach(element => {
            fecha = new Date(element.fechaInsercion);
            fila = tblAulas.insertRow();
            //Celda nombre aula
            aulaEstatusTexto = 'Aula actualmente '+(element.active?'Activa': 'Inactiva')
            celda = fila.insertCell(0);
            celda.innerHTML = '<div class="d-flex align-items-center"><img src="../IMG/claseIcono.jpg" alt=""style="width: 65px; height: 65px" class="rounded-circle" /><div class="ms-3"><p class="fw-bold mb-1"> Aula '
                               +element.nombre+'</p><p class="text-muted mb-0">'+aulaEstatusTexto+'</p> </div></div>';
            //Celda fecha insercion
            celda = fila.insertCell(1);
            celda.innerHTML = '<p class="fw-normal mb-1">'+fecha.toLocaleDateString('es-MX')+'</p>';
            //Celda Boton estatus
            celda = fila.insertCell(2);
            celda.innerHTML = (element.active? '<button type="button" class="btn btn-danger">Desactivar</button>':'<button type="button" class="btn btn-success">Activar</button>');
                               
        });
    }
}
function insertNewAula(){
    var reqInsertAulas = new XMLHttpRequest();
    var form = new FormData();
    reqInsertAulas.open('POST', MASTER_SERVER+'/api/aula');
    reqInsertAulas.setRequestHeader('Authorization', 'Bearer '+GetCookie('TknBrJk'));
    form.append('NombreAula',  txtNuevaAula.value);
    reqInsertAulas.send(form);
    reqInsertAulas.onload = function(){
        var objRespuesta = JSON.parse(reqInsertAulas.responseText);
        if(objRespuesta.rsp == 0){
            swal.fire({
                title: 'Aula registrada correctamente',
                text: objRespuesta.msg,
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then((result)=>{
                if (result.isConfirmed) {
                    loadExistClasses();
                    txtNuevaAula.value = '';
                }
            });
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: objRespuesta.msg,
              });
        }
    }
}
/*****************************************************************************/
/********************************Gestion Aulas********************************/

/**Main Module**/
window.onload = function(){
    loadExistClasses();

}