//Creación de variables
var txtUsuario = document.getElementById('Usuario');
var txtContraseña = document.getElementById('Contraseña');
var btnEnviar = document.getElementById('btnEntrar');

//Evento para botón enviar
btnEnviar.onclick = function(){
    var peticion = new XMLHttpRequest(); //Hacer petición a backend
    peticion.open('POST', 'http://mrsergiotorres17-001-site1.itempurl.com/api/Login/');
    var parametros = new FormData(); //Poner parametros
    parametros.append('Username', txtUsuario.value);
    parametros.append('Password', CryptoJS.SHA256(txtContraseña.value));//Mandar contraseña cifrada a backend
    peticion.send(parametros); //Enviar petición

    //Evento que espera respuesta de API
    peticion.onload = function(){
        var objeto = JSON.parse(peticion.responseText);
        //Validación de datos con respuesta de API
        if(objeto.rsp == 0){
            swal("Bienvenido!", objeto.nombreCompleto, "success");
        }
        else{
            swal("Error!", "El usuario o la contraseña son incorrectos", "error");
        }
    }
}

