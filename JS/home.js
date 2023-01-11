let userName=document.getElementById("user-name");
let userPic=document.getElementById("profile-pic");
async function getUserData (){
    let response=await fetch("http://localhost/php/get-user-data.php")
    let user= await response.json();
    userName.innerHTML=user.name;
    userPic.setAttribute("src",user.avatar)
}
getUserData();

async function getLatestOrder(){
    let response=await fetch("http://localhost/php/get-latest-order.php")
    let data= await response.json();
    console.log(data);
}
