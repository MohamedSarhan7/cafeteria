
const regForm = document.querySelector("form");
const file = regForm.avatar;
const username = regForm.username;
const email = regForm.email;
const password = regForm.password;
const confirmPassword = regForm.confirm_password;
const room = regForm.room;
const clearForm = document.querySelector("#clear");






clearForm.addEventListener("click",()=>{

    let inputs= document.querySelectorAll("input");
    for (let index = 0; index < inputs.length; index++) {
        

        inputs[index].value='';
    }

});






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

    formdata = new FormData();
    formdata.append("username", username.value);
    formdata.append("email", email.value);
    formdata.append("password", password.value);
    formdata.append("confirm_password", confirmPassword.value);
    formdata.append("room", room.value);
    formdata.append("avatar", file.files[0]);
    return formdata
}


function insertErrorMessages(ob) {
    for (const key in ob) {
        let input = document.querySelector(`input[name=${key}`);
        let error = input.nextElementSibling;
        error.textContent = ob[key];
        input.nextElementSibling.classList.add("active");
        // console.log(input.nextElementSibling);
    }
}

function manipulateResponse(res) {
    if (res['status'] == true) {
        console.log(res['data']);
    }
    else {
        console.log(res['errors']);
        insertErrorMessages(res['errors']);

    }

}



regForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let x = getdata();
    register(x);

    let input = document.querySelectorAll(`input`);
    input.forEach(obj => {
        obj.nextElementSibling.classList.remove("active");
    }
    );
})

// =======================================
// ========= JS Vaildation ===============