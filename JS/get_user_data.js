let username = document.querySelector(".user_name");
let image = document.querySelector(".user_image");
// img.setAttribute("src", obj.avatar.replace(/['"]+/g, ''));


async function get_user_data (){
    let res=await fetch("http://localhost/php/user.php")
    let data=await res.json();
    if(data['status']==true){
        username.innerHTML = data['data'].name;
        image.setAttribute("src", data['data'].avatar.replace(/['"]+/g, ''));
    }else{


        window.location.href="http://localhost/html-files/login.html";
    }
}

get_user_data();