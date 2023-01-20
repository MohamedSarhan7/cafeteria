//authentication


const toastLiveExample = document.getElementById('liveToast')
let mytoastbody = document.querySelector("#toastbody");
async function getCategories() {
  let res = await fetch("http://localhost/php/getCategories.php");
  let data = await res.json();
  console.log(data["status"]);
  hideErrorMessages();
  if (data["status"] == false) {
    console.log(data["data"]);
    insertErrorMessages(data["data"]);
  } else {
    createSelect(data["data"]);
  }
}
getCategories();

function createOption(obj) {
  const op = document.createElement("option");
  op.setAttribute("class", "op-val");
  op.setAttribute("value", obj.id);
  op.innerHTML = obj.name;
  return op;
}

function createSelect(data) {
  data.forEach((e) => {
    let item = createOption(e);
    //  item event
    category.appendChild(item);
  });
}

const form = document.getElementById("formId");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  var product = document.getElementById("product");
  var price = document.getElementById("price");
  var category = document.getElementById("category");
  var picture = document.getElementById("picture");
  //validation

  hideErrorMessages();
  verifyProduct(product);
  verifyPrice(price);
  verifyCategory(category);
  if (verifyPicture(picture)) {
    return false;
  }

  postData(product.value, price.value, category.value, picture.files[0]);
});

async function postData(product, price, category, picture) {
  let fd = new FormData();
  fd.append("product", product);
  fd.append("price", price);
  fd.append("category", category);
  fd.append("picture", picture);
  let res = await fetch("http://localhost/php/addProduct.php", {
    method: "post",
    body: fd,
  });
  let data = await res.json();
  // console.log(data["status"]);
  hideErrorMessages();
  if (data["status"] == false) {
    console.log(data["data"]);
    insertErrorMessages(data["data"]);
  } else {

    mytoastbody.innerHTML = data['data'];

    let toast = new bootstrap.Toast(toastLiveExample)
    toast.show()
  }
}

function insertErrorMessages(ob) {
  for (const key in ob) {
    let input = document.getElementById(`${key}`);
    let error = input.nextElementSibling;
    error.textContent = ob[key];
    input.nextElementSibling.classList.add("active");
  }
}

function hideErrorMessages() {
  let input = document.querySelector(`input[name=product]`);
  let error = input.nextElementSibling;
  input.nextElementSibling.classList.remove("active");

  let input1 = document.getElementById("price");
  let error1 = input.nextElementSibling;
  input1.nextElementSibling.classList.remove("active");

  let input2 = document.getElementById("category");
  let error2 = input.nextElementSibling;
  input2.nextElementSibling.classList.remove("active");

  let input3 = document.querySelector(`input[name=picture]`);
  let error3 = input.nextElementSibling;
  input3.nextElementSibling.classList.remove("active");
}

function verifyProduct(product) {
  if (product.value == "") {
    insertErrorMessages({ product: "product is required" });
  } else {
    if (product.value.length > 50) {
      insertErrorMessages({
        product: "product must be less than 50 charcters",
      });
    }
  }
}

function verifyPrice(price) {
  if (price.value == "") {
    insertErrorMessages({ price: "price is required" });
  } else {
    if (product.value < 0) {
      insertErrorMessages({
        price: "price must not be less than 0 EGP",
      });
    }
  }
}

function verifyCategory(category) {
  if (category.value == "") {
    insertErrorMessages({ category: "category is required" });
  } else {
    if (category.value.length > 100) {
      insertErrorMessages({
        category: "category must be less than 100 charcters",
      });
    }
  }
}

function verifyPicture(picture) {
  if (picture.value == "") {
    insertErrorMessages({ picture: "picture is required" });
    return true;
  } else {
  }
}
