let userName=document.getElementById("user-name");
let userPic=document.getElementById("profile-pic");
async function getUserData (){
    let response=await fetch("http://localhost/php/get-user-data.php")
    let user= await response.json();
    console.log(user);
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



// all products pagination

let allProductDiv=document.querySelector(".all-products");

async function getNoOfPages()
{
    let response=await fetch("http://localhost/php/AllProducts2.php");
    let data=await response.json() ;
    for (let i=0;i<data;i++)
    {
        let p=document.createElement("li");
        p.classList.add("page-link");
        p.innerHTML=i+1;
        document.querySelector(".change-product").append(p);
        p.addEventListener("click",()=>{
            removeAllChilds(allProductDiv)
            reqPage(p.innerHTML);
        })
    } 
}



async function reqPage (pageNo){
    let sentDATA =new FormData();
    sentDATA.append("pageno",`${pageNo}`);
    let res=await fetch ("http://localhost/php/getProductByPage2.php",{
        method:"POST",
        body:sentDATA,
    })
    let data=await res .json();
    data.forEach(product => {
        allProductDiv.appendChild(createCard(product));
    });
}
reqPage(1);



getNoOfPages();

function removeAllChilds(div) {
    while (div.hasChildNodes()) {
        div.removeChild(div.lastChild);
      }
}

function createCard(data) {
    let cartDiv=document.createElement("div");
    cartDiv.classList.add("product","card","text-center")
    let img =document.createElement("img");
    img.classList.add("card-img-top")
    img.setAttribute("src",data.avatar.replace(/['"]+/g, ''));
    cartDiv.appendChild(img);
    let cartBody=document.createElement("div");
    cartBody.classList.add("card-body");
    let cartTitle=document.createElement("h5");
    cartTitle.innerHTML=data.name;
    let price=document.createElement("p");
    price.innerHTML=`price: ${data.price}`;
    let addButton=document.createElement("p");
    addButton.innerHTML="Add To Order";
    addButton.classList.add("btn","btn-dark");
    cartBody.appendChild(cartTitle);
    cartBody.appendChild(price);
    cartBody.appendChild(addButton);
    cartDiv.appendChild(cartBody);
    return cartDiv;
}