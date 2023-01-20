import * as ValidateUser from "./ValidateUser.js";
let userTable = document.querySelector(".user-table tbody");
const pagenationUL = document.querySelector(".pg");
const modelBody = document.querySelector(".modal-body");
const deleteUserAction = document.querySelector("#delete");
let editForm = document.querySelector(".hidden-form-parent");
let Form = document.querySelector("#form");

let success = document.querySelector(".added");

const avatar = Form.avatar;
let username = Form.username;
let email = Form.email;
const password = Form.password;
const confirm_password = Form.confirm_password;
const room = Form.room;

let cancelForm = document.querySelector("#cancel-btn");
let imageForm = document.querySelector("#form-img");
cancelForm.addEventListener("click", () => {
    ValidateUser.clearErrors();

    editForm.classList.add("d-none");
})
let changepass = document.querySelector("#changepass");
let changeAvatar = document.querySelector("#changeavatar");

changepass.addEventListener("change", () => {
    // console.log(changepass);
    let passDiv = password.parentElement;
    let confPassDiv = confirm_password.parentElement;
    if (changepass.checked) {
        //  console.log(passDiv);
        passDiv.classList.remove("d-none");
        confPassDiv.classList.remove("d-none");
    } else {
        passDiv.classList.add("d-none");
        confPassDiv.classList.add("d-none");
    }

})
changeAvatar.addEventListener("change", () => {
    let avatarDiv = avatar.parentElement;
    if (changeAvatar.checked) {

        avatarDiv.classList.remove("d-none");
    } else {
        avatarDiv.classList.add("d-none");
    }

})
// changepass

// ===========================
const toastLiveExample = document.getElementById('liveToast')
let mytoastbody = document.querySelector("#toastbody");

// ====================================

function setFormValue(obj) {
    username.value = obj.name;
    email.value = obj.email;
    room.value = obj.room;
}


async function getAllUsers(pageNumber) {
    let formdata = new FormData();
    formdata.append("page", pageNumber);
    let res = await fetch("http://localhost/php/6_get_users_by_page.php", {
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
    if (obj['role'] != "admin") {
        const userTD = document.createElement("td");
        const roomTD = document.createElement("td");
        const imgTD = document.createElement("td");
        const editTD = document.createElement("td");
        const deleteTD = document.createElement("td");


        userTD.classList.add("c-1");
        roomTD.classList.add("c-2");
        imgTD.classList.add("c-3");
        editTD.classList.add("c-4");
        deleteTD.classList.add("c-5");

        const editBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");
        const img = document.createElement("img");

        img.setAttribute("src", obj.avatar.replace(/['"]+/g, ''));
        // img.setAttribute("src",obj.avatar);
        userTD.innerText = obj.name;
        roomTD.innerText = obj.room;
        imgTD.appendChild(img);
        editTD.appendChild(editBtn);
        deleteTD.appendChild(deleteBtn);
        editBtn.innerText = "edit";
        deleteBtn.innerText = "delete";

        editBtn.classList.add("btn");
        editBtn.classList.add("btn-outline-light");
        deleteBtn.classList.add("btn");
        deleteBtn.classList.add("btn-outline-danger");
        // deleteBtn.setAttribute("data-bs-toggle", "modal");
        // deleteBtn.setAttribute("data-bs-target", "#exampleModal");



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
            let res = confirm(`Are you sure wanna delete ${obj.name} ?`);
            if (res) {
                deleteUser(obj.id);
            }
        });

        const TR = document.createElement("tr");
        TR.appendChild(userTD);
        TR.appendChild(roomTD);
        TR.appendChild(imgTD);
        TR.appendChild(editTD);
        TR.appendChild(deleteTD);
        userTable.appendChild(TR);
    }
}





// =====================================================
// ================= pagination ========================


async function getTotalNumberOfPages() {
    let res = await fetch("http://localhost/php/6_get_total_number_of_pages.php");
    let data = await res.json();
    mainPagination(data);
    // console.log(data);
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

async function deleteUser(id) {
    let formdata = new FormData();
    formdata.append("id", id);
    let res = await fetch("http://localhost/php/6_delete_user.php", {
        method: "post",
        body: formdata,
    });

    let data = await res.json();
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
    let response = await fetch("http://localhost/php/6_edit_user.php", {
        method: "POST",
        body: formdata,
        // headers:
    });
    let data = await response.json();
    console.log(data);
    mainEditUser(data);
}
function mainEditUser(res) {
    ValidateUser.clearErrors();

    if (res['status'] == true) {
        editForm.classList.add("d-none");
        getAllUsers(1);
        // let success = document.querySelector(".added");
        setTimeout(()=>{
            mytoastbody.innerHTML = res['data'];

            let toast = new bootstrap.Toast(toastLiveExample)
            toast.show();
        },2000);
    }
    else {

        ValidateUser.insertErrorMessages(res['errors']);

    }
}

Form.addEventListener("submit", (e) => {
    e.preventDefault();
    let user = {
        "username": username.value,
        "email": email.value,
        "room": room.value
    }
    let avatarFlag
    if (changeAvatar.checked) {
        user['avatar'] = avatar.value;
        avatarFlag = true;

    }
    if (changepass.checked) {
        user['password'] = password.value;
        user['confirm_password'] = confirm_password.value;
    }

    let res;
    
    if (changeAvatar.checked) {

        res = ValidateUser.isValidUser(user, avatar.files[0]);
    }else{
        res = ValidateUser.isValidUser(user);
    }
    if (ValidateUser.isEmpty(res)) {
        console.log(user);
        editUser(getdata(user, id, avatarFlag, avatar));

    } else {

        console.log(res);
        ValidateUser.insertErrorMessages(res);
    }

})
// avatar.files[0]
function getdata(user, id, avatarFlag, avatar) {
    let formdata = new FormData();
    for (const key in user) {
        formdata.append(key, user[key]);
    }
    if (avatarFlag) {

        formdata.append('avatar', avatar);
    }
    formdata.append('user_id', id);
    return formdata;
}
// ==================================
getTotalNumberOfPages();

getAllUsers(1);

