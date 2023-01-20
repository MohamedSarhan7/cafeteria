let userName = document.getElementById("user-name");
let userPic = document.getElementById("profile-pic");
async function getUserData() {
  let response = await fetch("http://localhost/php/get-user-data.php");
  let user = await response.json();
  userName.innerHTML = user.name;
  userPic.setAttribute("src", user.avatar);
}
getUserData();

let selectUsers = document.querySelector("#users");
// console.log(latestOrderDiv);
// async function getLatestOrder() {
//   let response = await fetch("http://localhost/php/get-latest-order.php");
//   let data = await response.json();
//   console.log(data);
//   data.forEach((product) => {
//     latestOrderDiv.appendChild(createCard(product));
//   });
// }

//getLatestOrder();

async function getAllUsers() {
  let response = await fetch("http://localhost/php/getAllusers.php");
  let data = await response.json();
  data.forEach((user) => {
    selectUsers.append(createUsers(user));
  });
}

function createUsers(user) {
  let userOption = document.createElement("option");
  userOption.setAttribute("value", user.id);
  userOption.innerHTML = user.name;
  return userOption;
}

getAllUsers();



let roomsList = document.querySelector(".rooms");

async function getAllRooms() {
  let response = await fetch("http://localhost/php/getAllRooms.php");
  let data = await response.json();
  data.forEach((room) => {
    roomsList.append(createRooms(room));
  });
}

getAllRooms();

function createRooms(rooms) {
  let roomLi = document.createElement("option");
  roomLi.setAttribute("value", rooms.room);
  roomLi.innerHTML = rooms.room;
  return roomLi;
}

// all products pagination

let allProductDiv = document.querySelector(".all-products");

async function getNoOfPages() {
  let response = await fetch("http://localhost/php/getAvaliableProducts.php");
  let data = await response.json();
  console.log(data)
  for (let i = 0; i < data; i++) {
    let p = document.createElement("li");
    p.classList.add("page-link");
    p.innerHTML = i + 1;
    document.querySelector(".change-product").append(p);
    p.addEventListener("click", () => {
      removeAllChilds(allProductDiv);
      reqPage(p.innerHTML);
    });
  }
}

async function reqPage(pageNo) {
  let sentDATA = new FormData();
  sentDATA.append("pageno", `${pageNo}`);
  let res = await fetch("http://localhost/php/getAvalibleProductsByPage.php", {
    method: "POST",
    body: sentDATA,
  });
  let data = await res.json();
  data.forEach((product) => {
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

let productCart = document.querySelector(".product-cart");

function createCard(data) {
  let cartDiv = document.createElement("div");
  cartDiv.classList.add("product", "text-center", "col-3","ms-2","mt-2");
  let img = document.createElement("img");
  img.classList.add("card-img-top","img-fluid");
  img.setAttribute("src", data.avatar.replace(/['"]+/g, ""));
  img.style.height="200px";
  cartDiv.appendChild(img);
  let cartBody = document.createElement("div");
  cartBody.classList.add("card-body","card","rounded");
  let cartTitle = document.createElement("h5");
  cartTitle.innerHTML = data.name;
  let price = document.createElement("p");
  price.innerHTML = `price: ${data.price}`;
  let addButton = document.createElement("p");
  addButton.innerHTML = "Add To Order";
  addButton.classList.add("btn", "btn-dark");
  addButton.addEventListener("click", () => {
    isExist(data);
    calculateTotalOrder();
  });
  cartBody.appendChild(cartTitle);
  cartBody.appendChild(price);
  cartBody.appendChild(addButton);
  cartDiv.appendChild(cartBody);
  return cartDiv;
}

// check if order already exists then increase qty

function isExist(data) {
  for (let i = 0; i < productCart.children.length; i++) {
    if (productCart.children[i].children[0].innerHTML == data.id) {
      productCart.children[i].children[2].innerHTML =
        parseInt(productCart.children[i].children[2].innerHTML) + 1;
      productCart.children[i].children[5].innerHTML =
        parseInt(productCart.children[i].children[2].innerHTML) *
        parseInt(data.price);
      return;
    }
  }
  productCart.appendChild(createOrderCart(data));
}

// calculate total of order
let total = 0;
function calculateTotalOrder() {
  for (let i = 1; i < productCart.children.length; i++) {
    total =
      parseInt(total) + parseInt(productCart.children[i].children[5].innerHTML);
  }
  document.getElementById("total").innerHTML = total;
  total = 0;
}

//create order

function createOrderCart(product) {
  let orderDiv = document.createElement("div");
  orderDiv.classList.add("row","cart-row","justify-content-center","align-items-baseline","text-center");
  let productId = document.createElement("p");
  productId.innerHTML = product.id;
  productId.classList.add("d-none");
  let productName = document.createElement("p");
  productName.classList.add("col-2");
  productName.innerHTML = product.name;
  let productQty = document.createElement("p");
  productQty.classList.add("col-2");
  productQty.innerHTML = 1;
  let addProduct = document.createElement("i");
  addProduct.classList.add("fa-solid", "fa-plus", "col-2","mt-1");
  addProduct.addEventListener("click", () => {
    productQty.innerHTML = parseInt(productQty.innerHTML) + 1;
    productTotal.innerHTML =
      parseInt(productQty.innerHTML) * parseInt(product.price);
    calculateTotalOrder();
  });
  let removeProduct = document.createElement("i");
  removeProduct.classList.add("fa-solid", "fa-minus", "col-2","mt-1");
  removeProduct.addEventListener("click", () => {
    if (productQty.innerHTML <= 1) {
      productQty.innerHTML = 1;
    } else {
      productQty.innerHTML = parseInt(productQty.innerHTML) - 1;
    }
    productTotal.innerHTML =
      parseInt(productQty.innerHTML) * parseInt(product.price);
    calculateTotalOrder();
  });

  let productTotal = document.createElement("p");
  productTotal.classList.add("col-2","price");
  productTotal.innerHTML =
    parseInt(productQty.innerHTML) * parseInt(product.price);

  let productCancel = document.createElement("i");
  productCancel.classList.add("fa-solid", "fa-x", "col-2","mt-1");
  productCancel.addEventListener("click", () => {
    orderDiv.remove();
    calculateTotalOrder();
  });
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
let searchedProducts = document.querySelector(".searched-products");

let changeProduct = document.querySelector(".change-product");
let searchBar = document.querySelector(".search-bar");
let latestProducts=document.querySelector(".latest-order");
let paginatedProducts = document.querySelector(".products-pagination");
searchBar.addEventListener("change", () => {
  paginatedProducts.classList.add("d-none");
  latestProducts.classList.add("d-none");
  searchedProducts.innerHTML = "";
  getMatchedProducts(searchBar.value);
  searchedProducts.classList.remove("d-none");
  if (searchBar.value == "") {
    paginatedProducts.classList.remove("d-none");
    searchedProducts.classList.add("d-none");
    latestProducts.classList.remove("d-none");
    document.querySelector(".response").classList.add("d-none");
  }
});

async function getMatchedProducts(char) {
  let sentDATA = new FormData();
  sentDATA.append("search", char);
  let res = await fetch("http://localhost/php/getMatchedProducts.php", {
    method: "POST",
    body: sentDATA,
  });
  let data = await res.json();

  if (data == false) {
    document.querySelector(".response").innerHTML = "No Matched Values";
  } else {
    data.forEach((product) => {
      searchedProducts.appendChild(createCard(product));
      
    });
  }
}

//confirm order

let confirm = document.getElementById("confirm");
let emptyOrder = document.querySelector(".empty-order");

function checkEmptyOrder() {
  if (getProductInOrder().length == 0) {
    return true;
  }
  return false;
}


function showEmptyOrder(){
    emptyOrder.classList.remove("alert-success");
    emptyOrder.classList.add("alert-warning");
    emptyOrder.innerHTML = "Your Order Is empty";
}

function showSuccessOrder(){
    emptyOrder.classList.remove("alert-warning");
    emptyOrder.classList.add("alert-success");
    emptyOrder.innerHTML = "Successful Order";
}


confirm.addEventListener("click", () => {
  if (!checkEmptyOrder()) {
    confirmOrder(getOrderDetails());
  } else {
   showEmptyOrder();
  }
});

function getProductInOrder() {
  let productInOrders = [];
  for (let i = 1; i < productCart.children.length; i++) {
    let productOrder = {
      product_id: parseInt(productCart.children[i].children[0].innerHTML),
      qty: parseInt(productCart.children[i].children[2].innerHTML),
    };
    productInOrders.push(productOrder);
  }
  return productInOrders;
}

let notes = document.getElementById("notes");
function getOrderDetails() {
  let order = {
    id:selectUsers.value,
    room: roomsList.value,
    note: notes.value,
    products: getProductInOrder(),
  };
  return order;
}

async function confirmOrder(order) {
  let res = await fetch("http://localhost/php/confirmOrderAdmin.php", {
    method: "POST",
    body: JSON.stringify(order),
  });
  let data=await res .json();
  if(data) {
    showSuccessOrder();
  }
  else {
    showEmptyOrder();
  }
}
