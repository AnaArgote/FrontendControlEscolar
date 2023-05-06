function codigoFuncion(){
    var peticion = new XMLHttpRequest(); //Hacer petición a backend
    peticion.open('POST', 'http://mrsergiotorres17-001-site1.itempurl.com/api/Login/');
    var parametros = new FormData(); //Poner parametros
    parametros.append('Username', txtUsuario.value);
    parametros.append('Password', CryptoJS.SHA256(txtContraseña.value));//Mandar contraseña cifrada a backend
    peticion.send(parametros); //Enviar petición
    console.log('Contra '+CryptoJS.SHA256(txtContraseña.value));
}