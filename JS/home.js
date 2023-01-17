let userName=document.getElementById("user-name");
let userPic=document.getElementById("profile-pic");
async function getUserData (){
    let response=await fetch("http://localhost/php/get-user-data.php")
    let user= await response.json();
    userName.innerHTML=user.name;
    userPic.setAttribute("src",user.avatar)
}
getUserData();

let latestOrderDiv=document.querySelector(".latest-order");

async function getLatestOrder(){
    let response=await fetch("http://localhost/php/get-latest-order.php")
    let data= await response.json();
    latestOrderDiv.appendChild(createCard(data));
}

getLatestOrder();

let roomsList=document.querySelector(".rooms")

async function getAllRooms (){
    let response=await fetch("http://localhost/php/getAllRooms.php")
    let data= await response.json();
    console.log(data);
    data.forEach(room =>{
        roomsList.append(createRooms(room));
    });
}

getAllRooms();

function createRooms(rooms) {
    let roomLi=document.createElement("option");
    roomLi.setAttribute("value",rooms.room);
    roomLi.innerHTML=rooms.room;
    return roomLi;
}


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


//create cart

let productCart=document.querySelector(".product-cart");

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

    addButton.addEventListener("click",()=>{
            isExist(data);
            calculateTotalOrder();
     
    })
    cartBody.appendChild(cartTitle);
    cartBody.appendChild(price);
    cartBody.appendChild(addButton);
    cartDiv.appendChild(cartBody);
    return cartDiv;
}


// check if order already exsits then increase qty 

function isExist(data){
    for (let i=0;i<productCart.children.length;i++)
        {
            if(productCart.children[i].children[0].innerHTML==data.id)
            {
                productCart.children[i].children[2].innerHTML=parseInt(productCart.children[i].children[2].innerHTML)+1;
                productCart.children[i].children[5].innerHTML=parseInt(productCart.children[i].children[2].innerHTML)*parseInt(data.price);
                return ;
            }
        }
        productCart.appendChild(createOrderCart(data));
}

// calculate total of order 
let total=0;
function calculateTotalOrder(){
    for (let i=1;i<productCart.children.length;i++) {
        total=parseInt(total)+parseInt(productCart.children[i].children[5].innerHTML);
    }
    document.getElementById("total").innerHTML=total;
    total=0;
}

//create order

function createOrderCart(product) {
    let orderDiv=document.createElement("div");
    orderDiv.classList.add("row");
    let productId=document.createElement("p");
    productId.innerHTML=product.id;
    productId.classList.add("d-none");
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
        calculateTotalOrder();
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
        calculateTotalOrder();
    })


    let productTotal=document.createElement("p");
    productTotal.classList.add("col-4");
    productTotal.innerHTML=parseInt(productQty.innerHTML)*parseInt(product.price);


    let productCancel=document.createElement("i");
    productCancel.classList.add("fa-solid","fa-x","col-2");
    productCancel.addEventListener("click",()=>{
        orderDiv.remove();
        calculateTotalOrder();
        
    })
    orderDiv.appendChild(productId);
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
searchBar.addEventListener("change",()=>{
    paginatedProducts.classList.add("d-none");
    searchedProducts.innerHTML="";
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
            document.querySelector(".response").innerHTML="";
        });
    }   
}

//confirm order

let confirm=document.getElementById("confirm");

confirm.addEventListener("click",()=>{
    console.log(getOrderDetails());
    confirmOrder(getOrderDetails());
})



function getProductInOrder(){
    let  productInOrders=[]
    for (let i=1;i<productCart.children.length;i++) {
        let productOrder={
            product_id:parseInt(productCart.children[i].children[0].innerHTML),
            qty:parseInt(productCart.children[i].children[2].innerHTML)
        }
        productInOrders.push(productOrder);
    }
    return productInOrders;
}

let notes=document.getElementById("notes");
function getOrderDetails () {
    let orderDetails=[];
    let room={room:roomsList.value}
    let note={note:notes.value}
    orderDetails.push(room,note,getProductInOrder())
    return orderDetails;
}


async function confirmOrder(order) {
    let sentDATA =new FormData();
    sentDATA.append(order);
    sentDATA.append("search",char)
    let res=await fetch("http://localhost/php/confirmOrder.php",{
        method:"POST",
        body:sentDATA
        }
    )

}

