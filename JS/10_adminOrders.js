let body=document.querySelector("tbody");
const toastLiveExample = document.getElementById('liveToast')
let mytoastbody = document.querySelector("#toastbody");
// get all orders
async function sendrequest(){
    let res=await fetch("http://localhost/php/10_adminOrders.php");
    let data=await res.json();
    body.textContent="";
    mainpulateResp(data);
}

// get order details
async function get_order_details(id){
    let sentId =new FormData();
    sentId.append("orderID",id);
    let res = await fetch("http://localhost/php/10_orderData.php",
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
    let res = await fetch("http://localhost/php/10_updateStatus.php",
    {
        method:"post",
        body:sentId
    }
    );
    let data = await res.json();
    if(data['status']==true){
        sendrequest();
        setTimeout(()=>{

            mytoastbody.innerHTML = data['data'];
    
            let toast = new bootstrap.Toast(toastLiveExample);
            toast.show();
        },3000);

    }
}


// append to the table
function mainpulateResp(resData){
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
    var done = document.createElement("option");
    var canceled = document.createElement("option");
    // canceled
    selection.innerHTML=`<option selected>change status</option>`;
    outForDelivery.innerHTML = 'out for delivery';
    canceled.innerHTML = 'cancel';
    done.innerHTML='done';

    outForDelivery.setAttribute('value', "out_for_delivery");
    done.setAttribute('value',"done");
    canceled.setAttribute('value', "canceled");
    selection.append(outForDelivery);
    selection.append(done);
    selection.append(canceled);
    if(obj.status=='done'){
        selection.disabled=true;
    }
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
        total.classList.add("display-5");
        const row = createOrderDetailes2(e);
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

function createOrderDetailes2(obj) {
    const card = document.createElement("div");
    const cardbody = document.createElement("div");
    const productName = document.createElement("p");
    const img = document.createElement("img");
    const price = document.createElement("p");
    const quantity = document.createElement("p");

    card.classList.add("card", "m-3");
    cardbody.classList.add("card-body", "rounded");
    productName.classList.add("card-title");
    price.classList.add("card-text");
    quantity.classList.add("card-text");
    img.classList.add("card-img-top");

    quantity.innerHTML = "Quantity :" + obj.qty;
    price.innerText = "Price : " + obj.price;
    productName.innerText = obj.name;
    img.setAttribute("src", obj.avatar.replace(/['"]+/g, ''));
    img.style.height = "150px";
    // cardbody.classList.add("card-body");


    card.appendChild(img);
    card.appendChild(cardbody);
    cardbody.appendChild(productName);
    cardbody.appendChild(price);
    cardbody.appendChild(quantity);
    return card
}

sendrequest();

let tbody=document.getElementById("tb");
tbody.lastChild;
