import * as ValidateUser from "./ValidateUser.js";


var passErrorMessage = document.querySelector(".p1");
var confPassErrorMessage = document.querySelector(".p2");

async function setPassword(pass) {

    let setPass = new FormData();
    setPass.append("pass", pass);
    let res = await fetch("http://localhost/php/resetpassword.php", {
        method: "post",
        body: setPass,
    });
    let data = await res.json();
    if (data['status'] == false) {
        confPassErrorMessage.innerHTML = data['errors'];
        confPassErrorMessage.style.color = 'red';
        confPassErrorMessage.style.display = 'block';
    }
    else {
        window.location.href = "http://localhost/indedx.html";
    }
}


let form = document.querySelector("#myform");
let pass = form.password;
let confPass = form.confirm_password;



form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (checkPass(pass.value,confPass.value)) {

        setPassword(pass.value);
    }

});




function checkPass(pass,confPass) {

    if (pass == "" && confPass=="") {
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
    else if(pass!=confPass){
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

