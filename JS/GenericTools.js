function GetCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}
function SetCookie(nombre, value, numDiasExp){
    let hoy = new Date();
    hoy.setDate(hoy.getDate()+ numDiasExp)
    console.log('Calculo de dias '+hoy.toString());
    document.cookie = nombre+"="+value+";expires="+hoy.toString();
}
function SetCookie(nombre, value, fecha, real){
    console.log('Calculo de dias '+fecha);
    document.cookie = nombre+"="+value+";expires="+fecha;
}
function DeleteCookie(nombre){
    document.cookie = nombre+'=;max-age=0';
}
function SaveFile(fileName,contentFile){
    /*var txtFile = new File(fileName);
    txtFile.writeln(contentFile);
    txtFile.close();*/
    console.log(contentFile);
}
function getActualDay(){
    let date = new Date();
    let dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"]
    let dia = dias[date.getDay()];
    return dia;    
}