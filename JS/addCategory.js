//authentication
let success = document.querySelector(".added");
const toastLiveExample = document.getElementById('liveToast')
let mytoastbody = document.querySelector("#toastbody");

const form = document.getElementById("formId");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  var category = document.getElementById("category");
  //     //validation
  hideErrorMessages();
  if (verifyCategory(category)) {
    return false;
  }

  postData(category.value);
});

async function postData(category) {
  let fd = new FormData();
  fd.append("category", category);
  let res = await fetch("http://localhost/php/addCategory.php", {
    method: "post",
    // headers: {
    //     "Content-Type": "application/json",
    // },
    body: fd,
  });
  let data = await res.json();
  // console.log(data["status"]);
  // hideErrorMessages();
  if (data["status"] == false) {
    console.log(data["data"]);
    insertErrorMessages(data["data"]);
  } else {
    mytoastbody.innerHTML = data['data'];

    let toast = new bootstrap.Toast(toastLiveExample)
    toast.show()
    setTimeout(() => {
      window.location.href = "http://localhost/html-files/addProduct.html";

    }, 4000);  };
}

function insertErrorMessages(ob) {
  let input = document.getElementById("category");
  let error = input.nextElementSibling;
  error.textContent = ob["category"];
  input.nextElementSibling.classList.add("active");
}

function hideErrorMessages() {
  let input = document.getElementById("category");
  let error = input.nextElementSibling;
  input.nextElementSibling.classList.remove("active");
}

function verifyCategory(category) {
  if (category.value == "") {
    insertErrorMessages({ category: "category is required" });
    return true;
  } else {
    if (category.value.length > 100) {
      insertErrorMessages({
        category: "category must be less than 100 charcters",
      });
      return true;
    }
  }
}
