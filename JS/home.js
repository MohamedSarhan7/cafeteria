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


//flag
let i=0;


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
            removeAllChilds(allProductDiv);
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


//create order

// function createCartRow(data){
//     document.querySelector(".product-cart").appendChild(createOrderCart(data));
// }

// function updateTotal (productTotal,productQty,product){
//     productTotal.innerHTML=parseInt(productQty.innerHTML)*parseInt(product.price);
// }






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
    addButton.addEventListener("click",(e)=>{
        //  if (i==0)
        //  {
        
        //    e.target.classList.add("disabled");
        //      i=1;
        //     document.querySelector(".product-cart").appendChild(createOrderCart(data));
        //   }
        //  else
        //  {
        //      console.log(i);
        //      console.log("second");
        //  }
    })
    cartBody.appendChild(cartTitle);
    cartBody.appendChild(price);
    cartBody.appendChild(addButton);
    cartDiv.appendChild(cartBody);
    return cartDiv;
}

function createOrderCart(product) {
    let orderDiv=document.createElement("div");
    orderDiv.classList.add("row");
    let productName=document.createElement("p");
    productName.classList.add("col-2");
    productName.innerHTML=product.name;
    let productQty=document.createElement("p");
    productQty.classList.add("col-2");
    productQty.innerHTML=1;
    let addProduct=document.createElement("i");
    addProduct.classList.add("fa-solid","fa-plus","col-1");
    addProduct.addEventListener("click",()=>{
        productQty.innerHTML=parseInt(productQty.innerHTML)+1;
        productTotal.innerHTML=parseInt(productQty.innerHTML)*parseInt(product.price);
    })
    let removeProduct=document.createElement("i");
    removeProduct.classList.add("fa-solid","fa-minus","col-1");
    removeProduct.addEventListener("click",()=>{
        if (productQty.innerHTML<=1) {
            productQty.innerHTML=1;
        }
        else {
            productQty.innerHTML=parseInt(productQty.innerHTML)-1;
        }
        productTotal.innerHTML=parseInt(productQty.innerHTML)*parseInt(product.price);
    })


    let productTotal=document.createElement("p");
    productTotal.classList.add("col-4");
    productTotal.innerHTML=parseInt(productQty.innerHTML)*parseInt(product.price);


    let productCancel=document.createElement("i");
    productCancel.classList.add("fa-solid","fa-x","col-2");
    productCancel.addEventListener("click",()=>{
        orderDiv.remove();
        i=0;
    })
    orderDiv.appendChild(productName);
    orderDiv.appendChild(productQty);
    orderDiv.appendChild(addProduct);
    orderDiv.appendChild(removeProduct);
    orderDiv.appendChild(productTotal);
    orderDiv.appendChild(productCancel);
    return orderDiv;
}



//search
let searchedProducts=document.querySelector(".searched-products");

let changeProduct=document.querySelector(".change-product");
let searchBar=document.querySelector(".search-bar");

let paginatedProducts=document.querySelector(".products-pagination");
searchBar.addEventListener("keyup",()=>{
    paginatedProducts.classList.add("d-none");
    removeAllChilds(searchedProducts);
    getMatchedProducts(searchBar.value);
    searchedProducts.classList.remove("d-none")
    if (searchBar.value==""){
        paginatedProducts.classList.remove("d-none");
        searchedProducts.classList.add("d-none")
    }
})



async function getMatchedProducts (char){
    let sentDATA =new FormData();
    sentDATA.append("search",char)
    let res=await fetch("http://localhost/php/getMatchedProducts.php",{
        method:"POST",
        body:sentDATA
    }
    )
    let data=await res.json();
    console.log(char);
    console.log(data);
    if(data==false)
    {
        document.querySelector(".response").innerHTML="No Matched Values";
    }
    else {
        data.forEach(product => {
            searchedProducts.appendChild(createCard(product));
        });
    }   
}