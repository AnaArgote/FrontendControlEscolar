window.onload = function(){
  console.log(GetCookie('nameOfUser'));
  if (GetCookie('userName') != null) {
    txt = document.createTextNode('');
    document.getElementById('numNotifications').appendChild(txt);
  }else{
    location.replace('http://localhost/FEC/HTML/Login.html');
  }
}
/*
let iToEncrypt = document.getElementById('iText');
let btn = document.getElementById('btn');
let lbl = document.getElementById('lblText');

var crypt = {
    // (B1) THE SECRET KEY
    secret : "CIPHERKEY",
   
    // (B2) ENCRYPT
    encrypt : clear => {
      var cipher = CryptoJS.AES.encrypt(clear, crypt.secret);
      return cipher.toString();
    },
   
    // (B3) DECRYPT
    decrypt : cipher => {
      var decipher = CryptoJS.AES.decrypt(cipher, crypt.secret);
      return decipher.toString(CryptoJS.enc.Utf8);
    }
  };

function sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);                    

    // hash the message
    const hashBuffer = crypto.subtle.digest('SHA-256', msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string                  
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}
btn.onclick = function(){
    console.log(CryptoJS.SHA256(iToEncrypt.value));
    lbl.textContent = CryptoJS.SHA256(iToEncrypt.value);
}*/

document.getElementById('btnLogOut').addEventListener('click', function(){
  DeleteCookie('TknBrJk');
  DeleteCookie('userName');
  location.href ='index.html';
});