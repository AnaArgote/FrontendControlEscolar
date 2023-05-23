//Creación de variables
var txtUsuario = document.getElementById('Usuario');
var txtContraseña = document.getElementById('Contraseña');
var btnEnviar = document.getElementById('btnEntrar');
var txtMensajito = document.getElementById('mensajecuadrito');

txtMensajito.style.display = 'none';
//Evento para botón enviar
btnEnviar.onclick = function () {
    if (txtUsuario.value.length > 0 && txtContraseña.value.length > 0) {
        codigoFuncion();
    }
    else {
        txtMensajito.style.display = 'block';
    }
}

function codigoFuncion() {
    var peticion = new XMLHttpRequest(); //Hacer petición a backend
    peticion.open('POST', MASTER_SERVER + '/api/Login/');
    var parametros = new FormData(); //Poner parametros
    parametros.append('Username', txtUsuario.value);
    parametros.append('Password', CryptoJS.SHA256(txtContraseña.value));//Mandar contraseña cifrada a backend
    peticion.send(parametros); //Enviar petición
    //Evento que espera respuesta de API
    console.log('Usuario: '+txtUsuario.value);
    console.log('Pass: '+txtContraseña.value);
    peticion.onload = function () {
        console.log(peticion.responseText);
        var objeto = JSON.parse(peticion.responseText);
        //Validación de datos con respuesta de API
        if (objeto.rsp == 0) {
            console.log(objeto.token);
            SetCookie('TknBrJk', objeto.token, 15);
            SetCookie('userName', objeto.username, 15);
            SetCookie('nameOfUser', objeto.nombreCompleto, 15);
            SetCookie('sections', objeto.secciones);
            SetCookie('typeOfUser', objeto.userType);
            window.localStorage.setItem('img', objeto.imagen);
            console.log(window.localStorage.getItem('img'));
            swal.fire({
                title: 'Bienvenido ',
                text: objeto.nombreCompleto,
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then((result) => {
                if (result.isConfirmed) {
                    location.href = 'index.html';
                }
            });
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El usuario o contraseña son incorrectos.',
            })
        }
    }
}
