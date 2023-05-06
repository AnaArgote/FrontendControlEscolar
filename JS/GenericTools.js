function GetCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
            end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
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