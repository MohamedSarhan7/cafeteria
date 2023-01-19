var Error_message = document.getElementById("MYP");
async function getEmail(email) {
  console.log(email);
  let sentEmail = new FormData();
  sentEmail.append("email", email);
  let res = await fetch("http://localhost/php/7getEmail.php", {
    method: "post",
    body: sentEmail,
  });
  let data = await res.json();
  console.log(data.Status);
  if (data.Status == false) {
    Error_message.innerHTML = " This Email Is Not Exit";
    Error_message.style.color = "red";
    Error_message.style.display = "block";
  } else {
    window.location.href = "../html-files/resetPassword.html";
  }
}
let email = document.getElementById("email");
let btn = document.getElementById("btn");
btn.addEventListener("click", (e) => {
  if (validation(email.value)) {
    getEmail(email.value);
  }
});
function validation(user_email) {
  var email_format =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var flag = true;
  if (user_email == "") {
    Error_message.innerHTML = " Email Is Required";
    Error_message.style.color = "red";
    Error_message.style.display = "block";
    flag = false;
  } else if (!email_format.test(user_email)) {
    Error_message.innerHTML = " Email is Not Valid";
    Error_message.style.color = "red";
    Error_message.style.display = "block";
    flag = false;
  } else {
    Error_message.innerHTML = " ";
  }
  return flag;
}
