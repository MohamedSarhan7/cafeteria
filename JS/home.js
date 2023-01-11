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

getLatestOrder();



async function reqPage (p){
    let sentDATA =new FormData();
    sentDATA.append("pageno",`${p.innerHTML}`);
    let res=await fetch ("http://localhost/php/getProductByPage2.php",{
        method:"POST",
        body:sentDATA,
    })
    let d=await res .json();
    console.log(d);
}


async function getNoOfPages()
{
    let response=await fetch("http://localhost/php/AllProducts2.php");
    let data=await response.json() ;
    for (let i=0;i<data;i++)
    {
        let p=document.createElement("p");
        p.innerHTML=i+1;
        document.querySelector(".change-product").append(p);
        p.addEventListener("click",()=>{
            reqPage(p);
        })
    } 
}

getNoOfPages();