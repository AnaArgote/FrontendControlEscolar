
window.onload = function(){
  console.log(GetCookie('nameOfUser'));
  if (GetCookie('userName') != null) {
    var numNotifications = document.getElementById('numNotifications')
    txt = document.createTextNode('7');
    numNotifications.appendChild(txt);
  }else{
    location.replace('Login.html');
  }
}
document.getElementById('btnLogOut').addEventListener('click', function(){
  DeleteCookie('TknBrJk');
  DeleteCookie('userName');
  location.href ='index.html';
});