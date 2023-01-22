import * as ValidateUser from "./ValidateUser.js";


var Error_message=document.getElementById("MYP");

let form = document.querySelector("#form");
let email = form.email;
let vaild='';
async function getEmail(email) {

  let sentEmail = new FormData();
  sentEmail.append("email", email);
  let res = await fetch("http://localhost/php/forgetpassword.php", {
    method: "post",
    body: sentEmail,
  });

  let data = await res.json();
    if(data['status'] == false){
      Error_message.innerHTML=data['errors'];
      Error_message.style.color='red';
      Error_message.style.display='block';
    }
    else{
      vaild=email;
      document.querySelector(".forget").classList.add("d-none");
      document.querySelector(".reset").classList.remove("d-none");
  }
}







form.addEventListener("submit", (e) => {
  e.preventDefault();
 if(checkEmail(email.value)){

   getEmail(email.value);
 }

});




function checkEmail(email){

if ( email == "" ){
  Error_message.innerHTML=" Email Is Required";
  Error_message.style.color='red';
  Error_message.style.display='block';
  return false;
  
}
else if(!ValidateUser.ValidateEmail(email)){
  Error_message.innerHTML=(" Email is Not Valid");
  Error_message.style.color='red';
  Error_message.style.display='block';
  return false;
}
else{
  Error_message.style.display = 'none';
  return true;
}
}

// ==============================================




var passErrorMessage = document.querySelector(".p1");
var confPassErrorMessage = document.querySelector(".p2");

async function setPassword(pass,confPass,vaild) {

  let setPass = new FormData();
  setPass.append("pass1", pass);
  setPass.append("pass2", confPass);

  setPass.append("email", vaild);

  // console.log(pass);
  let res = await fetch("http://localhost/php/resetpassword.php", {
    method: "post",
    body: setPass,
  });
  let data = await res.json();
  if (data['status'] == false) {
    console.log(data);
    confPassErrorMessage.innerHTML = data['errors'];
    confPassErrorMessage.style.color = 'red';
    confPassErrorMessage.style.display = 'block';
  }
  else {
    window.location.href = "http://localhost/index.html";
  }
}


let resetform = document.querySelector("#myform");
let pass = resetform.password;
let confPass = resetform.confirm_password; 



resetform.addEventListener("submit", (e) => {
  e.preventDefault();
  if (checkPass(pass.value, confPass.value)) {

    setPassword(pass.value, confPass.value, vaild);
  }

});




function checkPass(pass, confPass) {
  console.log(pass);
  console.log(confPass);
  if (pass == "" && confPass == "") {
    passErrorMessage.innerHTML = " password Is Required";
    passErrorMessage.style.color = 'red';
    passErrorMessage.style.display = 'block';
    return false;

  }
  else if (!ValidateUser.ValidatePassword(pass)) {
    passErrorMessage.innerHTML = " password is Not Valid ";
    passErrorMessage.style.color = 'red';
    passErrorMessage.style.display = 'block';
    return false;
  }
  else if (pass != confPass) {
    passErrorMessage.style.display = 'none';
    confPassErrorMessage.innerHTML = " password Not match";
    confPassErrorMessage.style.color = 'red';
    confPassErrorMessage.style.display = 'block';
  }
  else {
    confPassErrorMessage.style.display = 'none';
    return true;
  }


}