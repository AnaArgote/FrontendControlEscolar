
window.onload = function(){
  console.log(GetCookie('nameOfUser'));
  if (GetCookie('userName') != null) {
    var numNotifications = document.getElementById('numNotifications');
    var imgUser = document.getElementById('imgUser');
    txt = document.createTextNode('1');
    numNotifications.appendChild(txt);
    imgUser.src = 'data:image/png;base64,'+window.localStorage.getItem('img');
    console.log(GetCookie('imgBs64'));
  }else{
    location.replace('Login.html');
  }
}
document.getElementById('btnLogOut').addEventListener('click', function(){
  DeleteCookie('TknBrJk');
  DeleteCookie('userName');
  location.href ='index.html';
});