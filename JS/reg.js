import * as ValidateUser from "./ValidateUser.js";
const regForm = document.querySelector("form");
const avatar = regForm.avatar;
const username = regForm.username;
const email = regForm.email;
const password = regForm.password;
const confirm_password = regForm.confirm_password;
const room = regForm.room;


async function register(formdata) {
    let response = await fetch("http://localhost/php/register.php", {
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


function manipulateResponse(res) {
    if (res['status'] == true) {
        window.location.href ="http://localhost/html-files/home_user.html";
    }
    else {
        ValidateUser.insertErrorMessages(res['errors']);

    }

}


regForm.addEventListener("submit", (e) => {
    // e.preventDefault();

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


