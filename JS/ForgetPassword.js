async function getEmail(email) {
  console.log(email);
  let sentEmail = new FormData();
  sentEmail.append("email", email);
  let res = await fetch("http://localhost/php/7getEmail.php", {
    method: "post",
    body: sentEmail,
  });
  let data = await res.json();
  console.log(data);
}
let email = document.getElementById("email");
let btn = document.getElementById("btn");
btn.addEventListener("click", (e) => {
  if (email.value == "") {
    e.preventDefault();
  }
  getEmail(email.value);
});
