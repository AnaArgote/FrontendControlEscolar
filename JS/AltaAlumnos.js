var nombre = document.getElementById('nombre');
var apellidop = document.getElementById('apellidoPaterno');
var apellidom = document.getElementById('apellidoMaterno');
var edad = document.getElementById('edad');
var foto = document.getElementById('foto');
var boton = document.getElementById('boton');

function insertardatos() {
    var peticion = new XMLHttpRequest();
    peticion.open("POST", "http://mrsergiotorres17-001-site1.itempurl.com/api/InsertarAlumno");
    peticion.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkxhdXJhLlRvcnJlc0Bjb250cm9sZXNjb2xhci5jb20iLCJuYmYiOjE2ODI0MDU1NzUsImV4cCI6MTY4MzcwMTU3NSwiaWF0IjoxNjgyNDA1NTc1fQ.Ljq4QuTctzobbkJTtJxqjdCbkUMleq6gjrDkfsN00KY');
    var parametros = new FormData();
    parametros.append('nombres',nombre.value);
    parametros.append('apellidos',apellidop.value + ' ' + apellidom.value);
    parametros.append('edad',edad.value);
    parametros.append('foto',foto.value);

    peticion.send(parametros);
    peticion.onload=function(){
        var respuesta = JSON.parse(peticion.responseText);
        
            alert(respuesta.msg)
    
    }
        
}
boton.onclick=function(){
    insertardatos();
}