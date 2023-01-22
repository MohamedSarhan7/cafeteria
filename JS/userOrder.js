var details = document.getElementById("cards");
const showTotal = document.getElementsByClassName("total")[0];
var pgul = document.querySelector(".pg");
var tbody = document.querySelector("tbody");
// async function getUserData() {
//   let res = await fetch("http://localhost/php/7getImageAndNameOfUser.php");
//   let data = await res.json();
//   displayUserData(data);
// }
function mainPagination(data) {
  for (let index = 1; index <= data; index++) {
    createPagination(index);
  }
}
async function getNumberOfPages() {
  let response = await fetch("http://localhost/php/7getNumberOfOrderPage.php");
  let data = await response.json();

  mainPagination(data);
}
function createPagination(obj) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  li.classList.add("page-item");
  li.classList.add("pg");
  a.classList.add("pg");
  a.classList.add("page-link");
  a.innerHTML = obj;
  a.classList.add("bg-transparent", "text-light", "border-black");
  a.addEventListener("click", () => {
    details.innerHTML = '';
    document.querySelector("tbody").innerHTML = "";
    requestNumberPage(a.innerHTML);
  });
  li.appendChild(a);
 
  pgul.appendChild(li);
}
async function requestNumberPage(pageNumber) {
  let sentDATA = new FormData();
  sentDATA.append("Page_No", `${pageNumber}`);
  let res = await fetch("http://localhost/php/7getProductByPage.php", {
    method: "POST",
    body: sentDATA,
  });
  let d = await res.json();
  displayUserOrder(d);
}
async function getOrderDetails(id) {
  let sentId = new FormData();
  sentId.append("orderID", id);
  let res = await fetch("http://localhost/php/7getOrderDetails.php", {
    method: "post",
    body: sentId,
  });

  let data = await res.json();
  displayOrderDetails(data);
}
async function showTotalPriceOrder(userid) {
  let sendId = new FormData();
  sendId.append("userID", userid);
  let res = await fetch("http://localhost/php/7showTotalPriceOrder.php", {
    method: "post",
    body: sendId,
  });
  let data = await res.json();

  displayTotal(data);
}
async function cancelOrder(id) {
  let sendId = new FormData();
  sendId.append("id_order", id);
  let res = await fetch("http://localhost/php/7cancleOrder.php", {
    method: "post",
    body: sendId,
  });
  let data = await res.json();
  location.reload();
}
async function getOrdersByDate(dateFrom, dateTo) {
  let fd = new FormData();
  fd.append("dateFrom", dateFrom);
  fd.append("dateTo", dateTo);
  let res = await fetch("http://localhost/php/7getOrdersByDate.php", {
    method: "POST",
    body: fd,
  });
  let data = await res.json();
  if(data["Status"] == "true"){
   tbody.textContent="";
    details.innerHTML ='';
    displayUserOrder(data["data"]);
  }else{
    tbody.textContent="";
    details.innerHTML = '';

  }
}
let dateFrom = document.getElementById("from");
let dateTo = document.getElementById("to");
dateFrom.addEventListener("change", () => {
  if (dateTo.value != "") {
    getOrdersByDate(dateFrom.value, dateTo.value);
  }
});
dateTo.addEventListener("change", () => {
  if (dateFrom.value != "") {
 
    getOrdersByDate(dateFrom.value, dateTo.value);
  }
});
// function displayUserData(resData) {
//   console.log(resData);
//   document.getElementById("img1").src = resData.avatar.replace(/['"]+/g, " ");
//   document.getElementById("MYp").innerHTML = resData.name;
// }
function displayUserOrder(resData) {
 
  resData.forEach((e) => {
    const row = createRow(e);
    tbody.append(row);
  });
}
function displayOrderDetails(resData) {
  details.innerHTML = "";

  resData.forEach((e) => {
    const row = createOrderDetails(e);
    details.style.display = "block";
    details.append(row);
  });
  showTotalPriceOrder(resData.userid);
}
function displayTotal(resData) {

  const totalOrderPrice = document.createElement("p");
  showTotal.innerHTML = "";
  resData.forEach((e) => {
    totalOrderPrice.innerHTML = "Total_Price: " + e.total;
    totalOrderPrice.style.color = "white";
    showTotal.append(totalOrderPrice);
  });
}
function createRow(res_Data) {
  const date = document.createElement("td");
  date.innerHTML = res_Data.created_at;
  const Action_user = document.createElement("td");
  const show = document.createElement("button");
  show.innerHTML = "Show";
  show.classList.add("btn-outline-light", "btn");
  Action_user.append(show);
  show.addEventListener("click", () => {
    getOrderDetails(res_Data.id);
  });
  const stat = document.createElement("td");
  stat.innerHTML = res_Data.status;
  const Amount = document.createElement("td");
  Amount.innerHTML = res_Data.total_price;
  const Action = document.createElement("td");
  if (res_Data.status == "proccessing") {
    const btn = document.createElement("button");
    Action.appendChild(btn);
    btn.innerHTML = "Cancle";
    btn.classList.add("btn-outline-danger", "btn");
    btn.addEventListener("click", () => {
      cancelOrder(res_Data.id);
    });
  } else {
    Action.innerHTML = " ";
  }
  const row = document.createElement("tr");
  row.append(date);
  row.append(Action_user);
  row.append(stat);
  row.append(Amount);
  row.append(Action);
  return row;
}
function createOrderDetails(resData) {
  const productName = document.createElement("p");
  const img = document.createElement("img");
  const price = document.createElement("p");
  const quantity = document.createElement("p");
  productName.classList.add("card-title");
  price.classList.add("card-text");
  quantity.classList.add("card-text");
  quantity.innerHTML = "Quantity :" + resData.qty;
  price.innerText = "Price : " + resData.price;
  productName.innerText = resData.name;
  img.setAttribute("src", resData.avatar.replace(/['"]+/g, ""));

  img.style.height = "200px";
  const cardbody = document.createElement("div");
  const card = document.createElement("div");
  card.appendChild(img);
  card.appendChild(cardbody);
  cardbody.appendChild(productName);
  cardbody.appendChild(price);
  cardbody.appendChild(quantity);
  cardbody.classList.add("card", "rounded");
  img.classList.add("card-img-top", "ps-5");
  cardbody.classList.add("card-body", "ms-5");
  return card;
}
getNumberOfPages();
requestNumberPage(1);

