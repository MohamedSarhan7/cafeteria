async function getUser_data() {
    let res = await fetch("http://localhost/php/user.php");
    let data = await res.json();
    displayUserData(data);
}
function displayUserData(resData){
    console.log(resData);
    document.getElementById("img1").src=resData.avatar.replace(/['"]+/g, '');
    document.getElementById("MYp").innerHTML=resData.name;    
}
getUser_data();
// async function getUser_Order() {
//     let res = await fetch("http://localhost/php/getProductByPage.php");
//     let data = await res.json();
//     displayUserOrder(data);
// }
async function get_order_details(id){
    let sentId =new FormData();
    sentId.append("orderID",id);
    let res = await fetch("http://localhost/php/get_order_details.php",
    {
        method:"post",
        body:sentId
    }
    );
    
    let data = await res.json();
    // console.log(data);
    displayOrderDetails(data);
     
}
async function cancelOrder(id){
    let sendId =new FormData();
    sendId.append("id_order",id);
    let res = await fetch("http://localhost/php/cancleOrder.php",
    {
        method:"post",
        body:sendId
    }
    );
    
    let data = await res.json();
    //  displaytotal(data); 
}
 function displaytotal(resData){
    console.log(resData);
    const totalOrderPrice= document.createElement("p");
    resData.forEach(e => {
        totalOrderPrice.innerHTML= "Total_Price: "+e.total;
        totalOrderPrice.style.color="white";
    document.getElementsByClassName("total")[0].append(totalOrderPrice);

})
    
   
}
async function showTotalPriceOrder(userid){
    let sendId =new FormData();
    sendId.append("userID",userid);
    let res = await fetch("http://localhost/php/showTotalPriceOrder.php",
    {
        method:"post",
        body:sendId
    }
    );
    let data = await res.json();
    displaytotal(data);
     
} 
function displayUserOrder(resData){
    console.log(resData);
        resData.forEach(e => {
            const row=create_row(e);
            document.querySelector("tbody").append(row);  

    })
}
function displayOrderDetails(resData){
    var details = document.getElementsByClassName("card")[0];
    var section =document.getElementsByClassName("details"[0]);
    details.innerHTML="";
    console.log(resData);
        resData.forEach(e => {
          const row=createOrderDetailes(e);
        //   section.style.display="block" ;  
           details.style.display="block";

           details.append(row); 
    });
    
    showTotalPriceOrder(resData.userid);
}

function create_row(res_Data){
    const date=document.createElement("td");
    date.innerHTML=res_Data.created_at ;
    const Action_user =document.createElement("td");
    const show =document.createElement("button");
    show.innerHTML="Show";
    Action_user.append(show);
    show.addEventListener("click",()=>{
        get_order_details(res_Data.id);
    });
  
    const stat=document.createElement("td");
    stat.innerHTML=res_Data.status;
    const Amount=document.createElement("td");
    Amount.innerHTML=res_Data.total_price;
    const Action =document.createElement("td");
    if(res_Data.status =="proccessing"){
     const  btn =document.createElement("button");
     Action.appendChild(btn);
     btn.innerHTML="Cancle";
     btn.style.backgroundColor="rgb(208, 118, 38)";
     btn.style.border="none";
     btn.style.color="white";
     btn.addEventListener("click",()=>{
        cancelOrder(res_Data.id);
        
    });

    }
    else{
        Action.innerHTML=" ";
    }
    const row=document.createElement("tr");
    row.append(date);
    row.append(Action_user);
    row.append(stat);
    row.append(Amount);
    row.append(Action);
    return row;
}
function createOrderDetailes(obj) {
    const productName = document.createElement("p");
    const img = document.createElement("img");
    const price = document.createElement("p");
    const quantity = document.createElement("p");
    quantity.innerHTML = "Amount: " +obj.qty;
    price.innerText = "Price: " + obj.price;
    productName.innerText = obj.name;
    img.setAttribute("src", obj.avatar.replace(/['"]+/g, ''));
    img.style.width="100px";
    const card = document.createElement("div");
    card.appendChild(productName);
    card.appendChild(img);
    card.appendChild(price);
    card.appendChild(quantity);

    return card;
}
async function getNoOfPages() {
    let response=await fetch("http://localhost/php/getNoOFPagesUsers.php");
    let data=await response.json();
    for (let i=0;i<data;i++)
    {
        let p=document.createElement("span");
        p.style.padding="3px";
        p.style.color="white"
        p.innerHTML=i+1;
        document.querySelector(".changeProducts").append(p);
        p.addEventListener("click",()=>{
            document.querySelector("tbody").innerHTML="";
            req(p.innerHTML);
        })
    
    } 
}
async function req (p){
    let sentDATA =new FormData();
    sentDATA.append("Page_No",`${p}`);
    let res=await fetch ("http://localhost/php/getProductByPage.php",{
        method:"POST",
        body:sentDATA,
    })
    let d=await res.json();
    displayUserOrder(d);
}
getNoOfPages();
req(1);