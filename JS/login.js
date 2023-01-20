//Authentication
import * as ValidateUser from "./ValidateUser.js";

const form = document.getElementById("formId");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  var email = document.getElementById("email");
  var password = document.getElementById("password");
  //validation
  hideErrorMessages();
  verifyPassword(password);
  if (verifyEmail(email)) {
    return false;
  }

  postData(email.value, password.value);
});

async function postData(email_user, password_user) {
  let fd = new FormData();
  fd.append("email", email_user);
  fd.append("password", password_user);
  let res = await fetch("http://localhost/php/login.php", {
    method: "post",
    // headers: {
    //     "Content-Type": "application/json",
    // },
    body: fd,
  });
  let data = await res.json();
  console.log(data["status"]);
  hideErrorMessages();
  if (data["status"] == false) {
    console.log(data["data"]);
    insertErrorMessages(data["data"]);
  } else {
    console.log(data["role"]);
    if (data["role"] == "user") {
      window.location.href = "../html-files/home_user.html";
    } else {
      window.location.href = "../html-files/home_admin.html";
    }
  }
}

function insertErrorMessages(ob) {
  for (const key in ob) {
    let input = document.querySelector(`input[name=${key}]`);
    let error = input.nextElementSibling;
    error.textContent = ob[key];
    input.nextElementSibling.classList.add("active");
  }
}

function hideErrorMessages() {
  let input = document.querySelector(`input[name=password]`);
  let error = input.nextElementSibling;
  input.nextElementSibling.classList.remove("active");

  let input1 = document.querySelector(`input[name=email]`);
  let error1 = input.nextElementSibling;
  input1.nextElementSibling.classList.remove("active");
}

function verifyEmail(email) {
  if (email.value == "") {
    insertErrorMessages({ email: "email is required" });
    return true;
  } else {
    if (!ValidateUser.ValidateEmail(email.value)) {
      // var p;
      
      insertErrorMessages({ email: "invalid email form" });
      return true;
    }
  }
}

function verifyPassword(password) {
  if (password.value == "") {
    insertErrorMessages({ password: "password is required" });
  } else {
    if (password.value.length < 8) {
      insertErrorMessages({
        password: "password must be more than 7 characters",
      });
    }
  }
}

// let v =[{"status":false,
// "errors":[{"ame":"ot vaild"},{"email":"ot vaild"}]
// }];
// console.log(v['status']true);

// let cookies = document.cookie.split("=");
// let errors = Cookies.get("errors");
// if (errors) {
//     errors = JSON.parse(errors);
//     insertErrorMessages(errors);
// }
