//Creación de variables
var txtUsuario = document.getElementById('Usuario');
var txtContraseña = document.getElementById('Contraseña');
var btnEnviar = document.getElementById('btnEntrar');

console.log('Cookie '+GetCookie('prueba'));
//Evento para botón enviar
btnEnviar.onclick = function(){
    var peticion = new XMLHttpRequest(); //Hacer petición a backend
    peticion.open('POST', 'http://192.168.0.173:8024/api/Login/');
    var parametros = new FormData(); //Poner parametros
    parametros.append('Username', txtUsuario.value);
    parametros.append('Password', CryptoJS.SHA256(txtContraseña.value));//Mandar contraseña cifrada a backend
    peticion.send(parametros); //Enviar petición

    //Evento que espera respuesta de API
    peticion.onload = function(){
        var objeto = JSON.parse(peticion.responseText);
        //Validación de datos con respuesta de API
        if(objeto.rsp == 0){
            console.log(objeto.token);
            SetCookie('TknBrJk', objeto.token,15);
            SetCookie('userName', objeto.username, 15);
            SetCookie('nameOfUser', objeto.nombreCompleto, 15);
            window.localStorage.setItem('img',objeto.imagen);
            console.log(window.localStorage.getItem('img'));
            swal.fire({
                title: 'Bienvenido ',
                text: objeto.nombreCompleto,
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then((result)=>{
                if (result.isConfirmed) {
                    location.href ='index.html';
                }
            });
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El usuario o contraseña son incorrectos.',
              })
        }
    }
}
