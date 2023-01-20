let body=document.querySelector("tbody");

// get all orders
async function sendrequest(){
    let res=await fetch("http://localhost:8080/php/10_adminOrders.php");
    let data=await res.json();
    console.log(data);
    body.textContent="";
    mainpulateResp(data);
}

// get order details
async function get_order_details(id){
    let sentId =new FormData();
    sentId.append("orderID",id);
    let res = await fetch("http://localhost:8080/php/10_orderData.php",
    {
        method:"post",
        body:sentId
    }
    );
    let data = await res.json();
    displayOrderDetails(data);
    const tp =document.createElement("p");
    let t=document.querySelector(".total");
    t.appendChild(tp);
    console.log(t);

}


// update status
async function getstatus(id,orderStatus){
    let sentId =new FormData();
    sentId.append("orderID",id);
    sentId.append("orderstatus",orderStatus);
    let res = await fetch("http://localhost:8080/php/10_updateStatus.php",
    {
        method:"post",
        body:sentId
    }
    );
    let data = await res.json();
}


// append to the table
function mainpulateResp(resData){
    console.log(resData);
    resData.forEach(e => {
        const row=createTR(e);
            body.append(row);
        })
}


// create table data
function createTR(obj){
const CA=document.createElement("td");
CA.innerHTML=obj.created_at;
const user=document.createElement("td");
user.innerHTML=obj.user_name;
const room=document.createElement("td");
room.innerHTML=obj.room;
const status =document.createElement("td");
status.innerHTML=obj.status;
const Action =document.createElement("td");
let sel= select(obj);
sel.addEventListener("change",()=>{
    console.log(sel.value);
    getstatus(obj.order_id,sel.value);
    sendrequest();   
});
const show=document.createElement("td");
const showbutton=document.createElement("button");
showbutton.innerHTML="Show";
showbutton.classList.add("btn-outline-light","btn");
show.append(showbutton);
showbutton.addEventListener("click",()=>{
    get_order_details(obj.order_id);
})
const row=document.createElement("tr");
row.append(CA);
row.append(user);
row.append(room);
row.append(status);
row.append(sel);
row.append(show);
return row;
}

// create selection for status
function select(obj){
    var selection=document.createElement("select");
    var outForDelivery =document.createElement("option");
    var done =document.createElement("option");
    selection.innerHTML=`<option selected>${obj.status}</option>`;
    outForDelivery.innerHTML='out for delivery';
    outForDelivery.setAttribute('value',"out_for_delivery");
    done.innerHTML='done';
    done.setAttribute('value',"done");
    selection.append(outForDelivery);
    selection.append(done);
    return selection;
    
}


// display cards
let total=document.querySelector(".total");
var details = document.querySelector("#card");


function displayOrderDetails(resData) {
    details.innerHTML = "";
    console.log(resData);
    resData.forEach((e) => {
        total.innerHTML="total price "+e.total_price;
        const row = createOrderDetailes(e);
        details.style.display = "block";

     details.append(row);
    });
  }

// create order cards
function createOrderDetailes(obj) {
    const cardbody=document.createElement("div");
    const productName = document.createElement("p");
    productName.classList.add("card-title");
    const img = document.createElement("img");
    const price = document.createElement("p");
    price.classList.add("card-text");
    const quantity = document.createElement("p");
    quantity.classList.add("card-text");
    quantity.innerHTML = "Quantity :" +obj.qty;
    price.innerText = "Price : " + obj.price;
    productName.innerText = obj.name;
    img.setAttribute("src", obj.avatar.replace(/['"]+/g, ''));
    console.log(img);
    img.style.height="200px";
    const card = document.createElement("div");
    card.appendChild(img);
    card.appendChild(cardbody);
    cardbody.appendChild(productName);
    cardbody.appendChild(price);
    cardbody.appendChild(quantity);
    cardbody.classList.add("card","rounded");
    img.classList.add("card-img-top");
    cardbody.classList.add("card-body");
    return card;
}

sendrequest();

let tbody=document.getElementById("tb");
tbody.lastChild;
console.log(tbody.children)