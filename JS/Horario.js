var tabla = document.getElementById('tblMaterias');
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
codigoFuncion();