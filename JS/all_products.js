import * as ValidateProduct from "./ValidateProduct.js";
let userTable = document.querySelector(".user-table tbody");
const pagenationUL = document.querySelector(".pg");
const modelBody = document.querySelector(".modal-body");
const deleteUserAction = document.querySelector("#delete");
let editForm = document.querySelector(".hidden-form-parent");
let Form = document.querySelector("#form");

let success = document.querySelector(".added");
const toastLiveExample = document.getElementById('liveToast')
let mytoastbody = document.querySelector("#toastbody");

const avatar = Form.avatar;
let username = Form.username;
let category = Form.category;
const password = Form.password;
const confirm_password = Form.confirm_password;
const price = Form.price;

let cancelForm = document.querySelector("#cancel-btn");
let imageForm = document.querySelector("#form-img");
cancelForm.addEventListener("click", () => {
    ValidateProduct.clearErrors();
    editForm.classList.add("d-none");
})
//let changepass = document.querySelector("#changepass");
let changeAvatar = document.querySelector("#changeavatar");

// changepass.addEventListener("change", () => {
    
//     let passDiv = password.parentElement;
//     let confPassDiv = confirm_password.parentElement;
//     if (changepass.checked) {
        
//         passDiv.classList.remove("d-none");
//         confPassDiv.classList.remove("d-none");
//     } else {
//         passDiv.classList.add("d-none");
//         confPassDiv.classList.add("d-none");
//     }

// })
changeAvatar.addEventListener("change", () => {
    let avatarDiv = avatar.parentElement;
    if (changeAvatar.checked) {
        avatarDiv.classList.remove("d-none");
    } else {
        avatarDiv.classList.add("d-none");
    }

})
// changepass



function setFormValue(obj) {
    // console.log(obj);
    username.value = obj.name;
    category.value = obj.category;
    price.value = obj.price;
}


async function getAllUsers(pageNumber) {
    let formdata = new FormData();
    formdata.append("pageno", pageNumber);
    let res = await fetch("http://localhost/php/getProductByPage2.php", {
        method: "post",
        body: formdata,
    });
    let data = await res.json();
    mainUserTable(data);
}

function mainUserTable(data) {
    userTable.textContent = '';
    data.forEach((element) => {
        let row = createUserTable(element);
    });

}
let id = 0;
function createUserTable(obj) {
        const userTD = document.createElement("td");
        const priceTD = document.createElement("td");
        const imgTD = document.createElement("td");
        const editTD = document.createElement("td");
        const deleteTD = document.createElement("td");


        userTD.classList.add("c-1");
        priceTD.classList.add("c-2");
        imgTD.classList.add("c-3");
        editTD.classList.add("c-4");
        deleteTD.classList.add("c-5");

        const editBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");
        const img = document.createElement("img");

        img.setAttribute("src", obj.avatar.replace(/['"]+/g, ''));
        // img.setAttribute("src",obj.avatar);
        userTD.innerText = obj.name;
        priceTD.innerText = obj.price;
        imgTD.appendChild(img);
        editTD.appendChild(editBtn);
        deleteTD.appendChild(deleteBtn);
        editBtn.innerText = "edit";
        

        editBtn.classList.add("btn");
        editBtn.classList.add("btn-outline-light");
        if (obj.status=="avaliable"){
            deleteBtn.innerText = "delete";
            deleteBtn.classList.add("btn-outline-danger");
        }
        else {
            deleteBtn.innerText = "Avaliable";
            deleteBtn.classList.add("btn-outline-success");
        }
        deleteBtn.classList.add("btn");
        



        editBtn.addEventListener("click", () => {
            imageForm.setAttribute("src", obj.avatar.replace(/['"]+/g, ''))
            // console.log(obj);
            editForm.classList.remove("d-none");
            id = obj.id;
            setFormValue(obj);

            //  dislay div with form
        });

        deleteBtn.addEventListener("click", () => {
            //   delete
            console.log(obj.id);
            let res = confirm(`Are you sure To update status of ${obj.name} ?`);
            if (res) {
                deleteUser(obj.id,obj.status);
            }
        });

        const TR = document.createElement("tr");
        TR.appendChild(userTD);
        TR.appendChild(priceTD);
        TR.appendChild(imgTD);
        TR.appendChild(editTD);
        TR.appendChild(deleteTD);
        userTable.appendChild(TR);
    
}





// =====================================================
// ================= pagination ========================


async function getTotalNumberOfPages() {
    let res = await fetch("http://localhost/php/AllProducts2.php");
    let data = await res.json();
    mainPagination(Math.ceil(data));
    console.log(data);
    if (data >= 1) {
        getAllUsers(1);
    }

}

function mainPagination(data) {
    for (let index = 1; index <= data; index++) {
        createPagination(index);
    }

}

function createPagination(obj) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    li.classList.add("page-item");
    li.classList.add("pg");
    a.classList.add("pg");
    a.classList.add("page-link");
    a.innerHTML = obj;
    a.addEventListener("click", () => {

        getAllUsers(a.innerHTML);
    })
    li.appendChild(a);
    pagenationUL.appendChild(li);

}
// ==================================
// ======== delete user =============

async function deleteUser(id,status) {
    let formdata = new FormData();
    formdata.append("id", id);
    formdata.append("status", status);
    let res = await fetch("http://localhost/php/delete_product.php", {
        method: "post",
        body: formdata,
    });

    let data = await res.json();
    console.log(data);
    if (data['status'] == true) {
        // let success = document.querySelector(".added");
        pagenationUL.textContent = '';

        getTotalNumberOfPages();

        // getAllUsers(1);
        setTimeout(() => {
            mytoastbody.innerHTML = data['data'];

            let toast = new bootstrap.Toast(toastLiveExample)
            toast.show();
        }, 2000);
    } else {
        console.log(data);
    }



    // d1.textContent = '';
    // mainGetAllUsersWithTotalMoney(data);

}

// =====================================
// =========== edit user ===============

async function editUser(formdata) {
    console.log(formdata);
    let response = await fetch("http://localhost/php/edit_product.php", {
        method: "POST",
        body: formdata,
        // headers:
    });
    let data = await response.json();
    console.log(data);
    mainEditUser(data);
}
function mainEditUser(res) {
    ValidateProduct.clearErrors();

    if (res['status'] == true) {
        editForm.classList.add("d-none");
        getAllUsers(1);
        // let success = document.querySelector(".added");

        setTimeout(() => {
            mytoastbody.innerHTML = res['data'];

            let toast = new bootstrap.Toast(toastLiveExample)
            toast.show();
        }, 2000);
    }
    else {

        ValidateProduct.insertErrorMessages(res['errors']);

    }
}

Form.addEventListener("submit", (e) => {
    e.preventDefault();
    let user = {
        "username": username.value,
        "category": category.value,
        "price": price.value,
    }
    let avatarFlag
    if (changeAvatar.checked) {
        user['avatar'] = avatar.value;
        avatarFlag = true;

    }
    // if (changepass.checked) {
    //     user['password'] = password.value;
    //     user['confirm_password'] = confirm_password.value;
    // }

    let res;
    
    if (changeAvatar.checked) {

        res = ValidateProduct.isValidUser(user, avatar.files[0]);
    }else{
        res = ValidateProduct.isValidUser(user);
    }
    if (ValidateProduct.isEmpty(res)) {
        editUser(getdata(user, id,avatarFlag, avatar));

    } else {

        console.log(res);
        ValidateProduct.insertErrorMessages(res);
    }

})
// avatar.files[0]
function getdata(user, id, avatarFlag, avatar) {
    let formdata = new FormData();
    for (const key in user) {
        formdata.append(key, user[key]);
    }
    if (avatarFlag) {

        formdata.append('avatar', avatar.files[0]);
    }
    formdata.append('user_id', id);
    return formdata;
}
// ==================================
getTotalNumberOfPages();

getAllUsers(1);



async function getCategories(){
    let res =await fetch ("http://localhost/php/get-all-categories.php")
    let data= await res.json();
    data.forEach((obj)=>{
        category.append(showCategories(obj)); 
    })
    
}

function showCategories(category) {
    let option=document.createElement("option");
    option.innerHTML=category.name;
    option .setAttribute("value",category.id);
    return option;
}

getCategories();

