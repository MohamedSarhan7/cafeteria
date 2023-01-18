import * as ValidateUser from "./ValidateUser.js";
const regForm = document.querySelector("form");
const avatar = regForm.avatar;
const username = regForm.username;
const email = regForm.email;
const password = regForm.password;
const confirm_password = regForm.confirm_password;
const room = regForm.room;
// const clearForm = document.querySelector("#clear");






// clearForm.addEventListener("click",()=>{

//     let inputs= document.querySelectorAll("input");
//     for (let index = 0; index < inputs.length; index++) {


//         inputs[index].value='';
//     }

// });






async function register(formdata) {
    let response = await fetch("http://localhost/php/add_user_admin.php", {
        method: "POST",
        body: formdata,
        // headers:
    });
    let data = await response.json();
    console.log(data);
    manipulateResponse(data);
}


function getdata() {

    let formdata = new FormData();
    formdata.append("username", username.value);
    formdata.append("email", email.value);
    formdata.append("password", password.value);
    formdata.append("confirm_password", confirm_password.value);
    formdata.append("room", room.value);
    formdata.append("avatar", avatar.files[0]);
    return formdata;
}


// function insertErrorMessages(ob) {
//     for (const key in ob) {
//         let input = document.querySelector(`input[name=${key}`);
//         let error = input.nextElementSibling;
//         error.textContent = ob[key];
//         input.nextElementSibling.classList.add("active");
//         // console.log(input.nextElementSibling);
//     }
// }

function manipulateResponse(res) {
    if (res['status'] == true) {

        let inputs = document.querySelectorAll("input");
        for (let index = 0; index < inputs.length; index++) {


            inputs[index].value = '';
        }
        let success = document.querySelector(".added");

        success.classList.remove("d-none");
        success.innerHTML = res['data'];
    }
    else {
        ValidateUser.insertErrorMessages(res['errors']);

    }

}


regForm.addEventListener("submit", (e) => {

    let user = {
        "username": username.value,
        "password": password.value,
        "confirm_password": confirm_password.value,
        "email": email.value,
        "room": room.value,
        "avatar": avatar.value
    }
    e.preventDefault();
    ValidateUser.clearErrors();
    // console.log(avatar.files[0].size);
    let res = ValidateUser.isValidUser(user, avatar.files[0]);
    if (ValidateUser.isEmpty(res)) {
        register(getdata());

    } else {

        console.log(res);
        ValidateUser.insertErrorMessages(res);
    }




})

// function clearErrors() {
//     let input = document.querySelectorAll(`input`);
//     input.forEach(obj => {
//         obj.nextElementSibling.classList.remove("active");
//     }
//     );
// }
// =======================================
// ========= JS Vaildation ===============


