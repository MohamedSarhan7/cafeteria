//  dom 
let d1 = document.querySelector(".user-money tbody");
let userTable = document.querySelector(".user-money");

let cardDiv = document.querySelector("#card");

let orderDetail = document.querySelector(".order-details");
let ordersSecion = document.querySelector(".user-order");
let secionTwo = document.querySelector(".user-order tbody");
let selectMenu = document.getElementById("users-select");
let allBtn = document.getElementById("all");
const pagenationUL = document.querySelector(".pg");


const toastLiveExample = document.getElementById('liveToast')
let mytoastbody = document.querySelector("#toastbody");
// =======================================================
// =========== select menu ======================================
function createOption(obj) {
    const op = document.createElement("option");
    op.setAttribute("class", "op-val");
    op.setAttribute("value", obj.user_id);
    op.innerHTML = obj.name;
    return op;

}


async function getuserForSelectMenu() {
    let res = await fetch("http://localhost/php/9_get_all_users.php", {
        method: "get",
    });
    let data = await res.json();
    mainGetUserForSelectMenu(data);
}
function mainGetUserForSelectMenu(data) {
    data.forEach((e) => {
        let item = createOption(e);
        //  item event
        selectMenu.appendChild(item);
    })

}


//  or  item event 
selectMenu.addEventListener("change", () => {
    ordersSecion.style.display = "none";
    cardDiv.textContent = '';

    if (!isNaN(selectMenu.value)) {
        console.log(selectMenu.value);
        getOneUsersWithTotalMoney(selectMenu.value);
    }


});

// ==================================================


//================================================
// ============= section 1 =======================
//  get users with total money

allBtn.addEventListener("click", () => {
    d1.textContent = '';
    ordersSecion.classList.remove('active');
    getAllUsersWithTotalMoney(1);
})
async function getOneUsersWithTotalMoney(id) {
    let formdata = new FormData();
    formdata.append("id", id);
    let res = await fetch("http://localhost/php/9_get_one_user_with_total_money.php", {
        method: "post",
        body: formdata,
    });
    let data = await res.json();
    console.log(data);
    d1.textContent = '';
    ordersSecion.classList.remove('active');
    mainGetAllUsersWithTotalMoney(data);

}

async function getAllUsersWithTotalMoney(pageNumber) {
    let formdata = new FormData();
    formdata.append("page", pageNumber);
    let res = await fetch("http://localhost/php/9_get_all_users_with_total_money.php", {
        method: "post",
        body: formdata,
    });
    let data = await res.json();
    d1.textContent = '';
    mainGetAllUsersWithTotalMoney(data);

}


function mainGetAllUsersWithTotalMoney(data) {
    data.forEach((e) => {
        ordersSecion.style.display = "none";
        cardDiv.textContent = '';
        const item = createTRforD1(e);
        item.addEventListener("click", () => {
            getuserOrders(e.user_id);
            ordersSecion.style.display = "block";
        });
        d1.appendChild(item);
    })
}
//  page number


// ===================================================
// ============ section 2 ============================
// get user   orders
async function getuserOrders(id) {
    let formdata = new FormData();
    formdata.append("id", id);
    let res = await fetch("http://localhost/php/9_get_user_orders.php", {
        method: "post",
        body: formdata,
    });

    let data = await res.json();

    mainGetUserOrder(data);

}


function mainGetUserOrder(arr) {
    secionTwo.textContent = '';
    cardDiv.textContent = "";
    // console.log("log");
    arr.forEach((e) => {
        const test = createTRforD2(e);
        test.addEventListener("click", () => {
            cardDiv.textContent = '';
            getOrderDetailes(e.order_id);
            orderDetail.style.display = "block";

        })
        secionTwo.appendChild(test);
    });

}



function createTRforD1(obj) {
    userTable.classList.remove("d-none");

    const userTD = document.createElement("td");
    const moneyTD = document.createElement("td");
    userTD.innerText = obj.name;
    moneyTD.innerText = obj.total_money;
    const TR = document.createElement("tr");
    moneyTD.classList.add("td-color");
    userTD.classList.add("td-color");
    TR.classList.add("td-color");
    TR.appendChild(userTD);
    TR.appendChild(moneyTD);
    return TR;
}

function createTRforD2(obj) {
    ordersSecion.style.display = "block";

    const dateTD = document.createElement("td");
    const moneyTD = document.createElement("td");
    dateTD.innerText = obj.created_at;
    moneyTD.innerText = obj.total_price;
    const TR = document.createElement("tr");
    moneyTD.classList.add("td-color");
    dateTD.classList.add("td-color");
    TR.classList.add("td-color");
    TR.appendChild(dateTD);
    TR.appendChild(moneyTD);
    return TR;
}


// ====================================================
// ======= section 3===================================
// get order detailes

function createOrderDetailes(obj) {
    const card = document.createElement("div");
    card.classList.add("card");
    // card.classList.add("flex-column");
    card.classList.add("lil-card");

    const productName = document.createElement("p");
    const img = document.createElement("img");
    img.classList.add("card-image-top");
    const price = document.createElement("p");
    const quantity = document.createElement("p");




    quantity.innerHTML = obj.qty;
    price.innerText = obj.price;
    productName.innerText = obj.name;
    img.setAttribute("src", obj.avatar.replace(/['"]+/g, ''));
    // console.log(img);
    // img.setAttribute("src", obj.avatar);


    card.appendChild(productName);
    card.appendChild(img);
    card.appendChild(price);
    card.appendChild(quantity);
    cardDiv.append(card);
}
// let cadDiv = document.getElementById("card");
function createOrderDetailes2(obj) {
    const card = document.createElement("div");
    const cardbody = document.createElement("div");
    const productName = document.createElement("p");
    const img = document.createElement("img");
    const price = document.createElement("p");
    const quantity = document.createElement("p");

    card.classList.add("card","m-3");
    cardbody.classList.add("card-body", "rounded");
    productName.classList.add("card-title");
    price.classList.add("card-text");
    quantity.classList.add("card-text");
    quantity.innerHTML = "Quantity :" + obj.qty;
    price.innerText = "Price : " + obj.price;
    productName.innerText = obj.name;
    img.setAttribute("src", obj.avatar.replace(/['"]+/g, ''));
    img.style.height = "150px";
    img.classList.add("card-img-top");
    // cardbody.classList.add("card-body");


    card.appendChild(img);
    card.appendChild(cardbody);
    cardbody.appendChild(productName);
    cardbody.appendChild(price);
    cardbody.appendChild(quantity);
    cardDiv.append(card);
}


async function getOrderDetailes(id) {
    let formdata = new FormData();
    formdata.append("id", id);
    let res = await fetch("http://localhost/php/9_get_order_detailes.php", {
        method: "post",
        body: formdata,
    });

    let data = await res.json();
    // console.log(data);
    mainGetOrderDetailes(data);

}
function mainGetOrderDetailes(arr) {


    arr.forEach((e) => {
        const test = createOrderDetailes2(e);

    });
}



// ======================================================
// ======== filter orders based on date==================
let dateFrom = document.querySelector("#from");
let dateTo = document.querySelector("#to");

dateFrom.addEventListener("change",()=>{
    if(dateTo.value!=''){
        getOrdersByDate(dateFrom.value,dateTo.value);
    }
})
dateTo.addEventListener("change", () => {
    if (dateFrom.value != '') {
        getOrdersByDate(dateFrom.value, dateTo.value);
    }
})

async function getOrdersByDate(dateFrom, dateTo ){
let fd= new FormData();
    fd.append("datefrom",dateFrom);
    fd.append("dateto",dateTo);
    let res=await fetch("http://localhost/php/9_get_orders_by_date.php",{
        method:"POST",
        body:fd
    });
    let data=await res.json();
    mainFilterOrdersByDate(data);

}


function mainFilterOrdersByDate(data){
    userTable.classList.add("d-none");
    if(data['status']==true){
        secionTwo.textContent='';
        data['data'].forEach((e)=>{

            const item = createTRforD2(e);
            item.addEventListener("click", () => {
                cardDiv.textContent = '';
                getOrderDetailes(e.order_id);
                orderDetail.style.display = "block";

            })
            secionTwo.appendChild(item);
        })
    }else{
        mytoastbody.innerHTML = data['data'];

        let toast = new bootstrap.Toast(toastLiveExample)
        toast.show()
    }


}

// ======================================================
// ========== pagenation fun ============================
async function getTotalNumberOfPages() {
    let res = await fetch("http://localhost/php/9_get_total_number_of_pages.php");
    let data = await res.json();
    mainPagination(data);
    if (data >= 1) {
        getAllUsersWithTotalMoney(1);
    }

}

function mainPagination(data) {
    for (let index = 1; index <= data; index++) {
        createPagination(index);

    }

}

function createPagination(obj) {
    userTable.classList.remove("d-none");

    const li = document.createElement("li");
    const a = document.createElement("a");
    li.classList.add("page-item");
    li.classList.add("pg");
    a.classList.add("pg");
    a.classList.add("page-link");
    a.innerHTML = obj;
    a.addEventListener("click", () => {
    //     send your request her
    //  and delete this
        getAllUsersWithTotalMoney(a.innerHTML);
    })
    li.appendChild(a);
    pagenationUL.appendChild(li);

}

// ======================================================
// =============== get admin details ====================


// ======================================================
// =========== call main Functions ======================
getTotalNumberOfPages();   // calling the initial page insde if gt 1


getuserForSelectMenu();
