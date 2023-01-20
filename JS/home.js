const toastLiveExample = document.getElementById('liveToast')
let mytoastbody = document.querySelector("#toastbody");

let latestOrderDiv = document.querySelector(".latest-order");
console.log(latestOrderDiv);
async function getLatestOrder() {
  let response = await fetch("http://localhost/php/get-latest-order.php");
  let data = await response.json();
  console.log(data);
  data.forEach((product) => {
    latestOrderDiv.appendChild(createCard(product));
  });
}

getLatestOrder();

let roomsList = document.querySelector(".rooms");

async function getAllRooms() {
  let response = await fetch("http://localhost/php/getAllrooms.php");
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
    const li = document.createElement("li");
    const a = document.createElement("a");
    li.classList.add("page-item");
    li.classList.add("pg");
    a.classList.add("pg");
    a.classList.add("page-link");
    a.innerHTML = i + 1;
    li.appendChild(a);
    document.querySelector(".change-product").append(li);
    a.addEventListener("click", () => {
      removeAllChilds(allProductDiv);
      reqPage(a.innerHTML);
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
  let img = document.createElement("img");
  let cartBody = document.createElement("div");
  let cartTitle = document.createElement("h5");
  let price = document.createElement("p");
  let addButton = document.createElement("p");

  cartDiv.classList.add("product", 'card', "text-center", "ms-2", "mt-2");
  // cartDiv.style.width = "200px!important";
  img.classList.add("card-img-top","img-fluid");
  img.setAttribute("src", data.avatar.replace(/['"]+/g, ""));
  img.style.height = "150px";
  cartDiv.appendChild(img);
  cartBody.classList.add("card-body","rounded");
  cartTitle.innerHTML = data.name;
  price.innerHTML = `price: ${data.price}`;
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
  orderDiv.classList.add("row","cart-row","justify-content-center","align-items-baseline","text-center","myCart");
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
    document.querySelector(".response").textContent='';
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
    return false;
  }
  return false;
}

function showEmptyOrder(){
    // emptyOrder.classList.remove("alert-success");
    // emptyOrder.classList.add("alert-warning");
    // emptyOrder.innerHTML = "Your Order Is empty";
  mytoastbody.innerHTML = "Your Order Is empty"

  let toast = new bootstrap.Toast(toastLiveExample)
  toast.show()
}
function showSuccessOrder() {
  let myCart = document.querySelectorAll(".myCart");
  
  myCart.forEach((e) => {
   
    e.remove();
  })
    // emptyOrder.classList.remove("alert-warning");
    // emptyOrder.classList.add("alert-success");
    // emptyOrder.innerHTML = "Successful Order";
  mytoastbody.innerHTML = "Order Placed Successfully "

  let toast = new bootstrap.Toast(toastLiveExample)
  toast.show()
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
    room: roomsList.value,
    note: notes.value,
    products: getProductInOrder(),
  };
  return order;
}

async function confirmOrder(order) {
  let res = await fetch("http://localhost/php/confirmOrder.php", {
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
