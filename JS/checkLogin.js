
async function cehckLogin() {
    let res = await fetch("http://localhost/php/check_login.php")
    let data = await res.json();
    if (data['status'] == true) {
      if (data['role']=="admin"){
          window.location.href = "http://localhost/html-files/home_admin.html";
      } else if (data['role'] == "user"){
            
            window.location.href = "http://localhost/html-files/home_admin.html";
      }
    }
}

cehckLogin();