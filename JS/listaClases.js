function loadClases() {
    var url = "https://localhost:7297/api/VistasPrincipalClase"
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjIzMTQwMTciLCJuYmYiOjE2NzkyODc2MjEsImV4cCI6MTY4MDU4MzYyMSwiaWF0IjoxNjc5Mjg3NjIxfQ.bmXTKsBqCzBLCPnrJmobg5T06eS-K-C8ZVaQMv-FtjA");
    xhr.send();
    xhr.onload = function() {
      let jsonObj = JSON.parse(xhr.responseText);
      console.log(jsonObj);
    };

}
window.onload = function(){
    console.log('cargas')
    loadClases();
}