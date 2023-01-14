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
    cartDiv.classList.add("product","card","text-center","col-4")
    let img =document.createElement("img");
    img.classList.add("card-img-top,img-fluid")
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

function createOrderCart(product) {
    let productName=document.createElement("p");
    productName.classList.add("col-2");
    productName.innerHTML=product.name;
    let productQty=document.createElement("p");
    productQty.classList.add("col-2");
    productQty.innerHTML=1;
    let addProduct=document.createElement("i");
    addProduct.classList.add("fa-solid","fa-plus","col-1");
    let removeProduct=document.createElement("i");
    removeProduct.classList.add("fa-solid","fa-minus","col-1");
    
    
}

            <p class="product-name col-2">tea</p>
            <p class="product-price col-2">5</p>
            <i class="fa-solid fa-plus col-1 add-product"></i>
            <i class="fa-solid fa-minus col-1 remove-product"></i>
            <p class="product-price col-4">EGP 25</p>
            <i class="fa-solid fa-x col-2 delete-order"></i>