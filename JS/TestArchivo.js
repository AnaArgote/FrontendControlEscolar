
var imgTag = document.getElementById('imgUsuario');

var request = new XMLHttpRequest();
var data = new FormData();
request.open('POST', 'https://localhost:7297/api/GetPhotoUser');
data.append('Nombre','Ana Cristina');
data.append('Apellido','Argote Gasca');
request.send(data);
request.onload = function(){
    let obj = JSON.parse(request.responseText);
    console.log(obj.nombres);
    console.log(obj.apellidos);
    console.log(obj.image);
    imgTag.src = 'data:image/png;base64,'+obj.image;
}

