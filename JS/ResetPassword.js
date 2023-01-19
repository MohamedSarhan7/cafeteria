var submit = document.getElementById("btn");
var Error_message = document.getElementsByClassName("MYP");
var user_Password = document.getElementById("Password");
var ConfirmPassword = document.getElementById("confirmPassword");
 function showError(error){
  Error_message[0].innerHTML =  error ;
  Error_message[0].style.color = "red";
  Error_message[0].style.display = "block";
 }
function validatePassword(password , confirmPassword) {
  var flag = true;
  if (password == "") {
       showError("Password Is Required");
      flag = false;
  } else if (password.length < 8) {
    showError("Password  Must Be At Least 8 Number");
    flag = false;
  } else {
    Error_message[0].innerHTML = " ";
  }
  if (password != confirmPassword) {
    Error_message[1].innerHTML = " Password Not Match";
    Error_message[1].style.color = "red";
    Error_message[1].style.display = "block";
    flag = false;
  } else {
    Error_message[1].innerHTML = " ";
  }
  return flag;
}

async function resetPassword(password , confirmPassword) {
  let passwordReset = new FormData();
  passwordReset.append("password",password);
  passwordReset.append("ConfirmPassword",confirmPassword);
  let res = await fetch("http://localhost/php/7resetPassword.php", {
    method: "post",
    body: passwordReset,
  });
  let data = await res.json();
  console.log(data);
   if(data.Status == "false"){
      console.log(data.Status);
   }
   console.log(data.Status);
   window.location.href ="../index.html"
}
submit.addEventListener("click", () => {
  if (validatePassword(user_Password.value ,ConfirmPassword.value)) {
    resetPassword(user_Password.value ,ConfirmPassword.value);
  }
});
