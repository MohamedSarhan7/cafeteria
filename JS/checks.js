// let res = [
//     { user_id: 2, name: "mohamedsarhan", total_money: "35" },
//     { user_id: 3, name: "kreem", total_money: "180" },
//     { user_id: 4, name: "hosaam", total_money: "120" },
// ];

let res2 = [
    { order_id: 1, total_price: 20, created_at: "2023-01-08 18:59:24" },
    { order_id: 2, total_price: 15, created_at: "2023-01-08 19:00:05" },
];

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
    let res = await fetch("http://localhost/cafeteria/php/checks/get_all_users.php", {
        method: "get",
    });
    let data = await res.json();
    mainGetUserForSelectMenu(data);
}
let selectMenu = document.getElementById("users-select");
function mainGetUserForSelectMenu(data) {
    data.forEach((e) => {
        let item = createOption(e);
        //  item event
        selectMenu.appendChild(item);
    })

}
getuserForSelectMenu();
//  or  item event 
selectMenu.addEventListener("change",()=>{
    console.log(selectMenu.value);
    getOneUsersWithTotalMoney(selectMenu.value);

});

// ===========================================

//=============================================
// ============= section 1 ===================
//  get users with total money

async function getOneUsersWithTotalMoney(id) {
    let formdata = new FormData();
    formdata.append("id", id);
    let res = await fetch("http://localhost/cafeteria/php/checks/get_one_user_with_total_money.php", {
        method: "post",
        body: formdata,
    });
    let data = await res.json();
console.log(data);
d1.textContent='';
ordersSecion.classList.remove('active');
    mainGetAllUsersWithTotalMoney(data);

}

async function getAllUsersWithTotalMoney(pageNumber) {
    let formdata = new FormData();
    formdata.append("page", pageNumber);
    let res = await fetch("http://localhost/cafeteria/php/checks/get_all_users_with_total_money.php", {
        method: "post",
        body: formdata,
    });
    let data = await res.json();
 
mainGetAllUsersWithTotalMoney(data);
  
}


function mainGetAllUsersWithTotalMoney(data){
data.forEach((e)=>{
    const item = createTRforD1(e);
    item.addEventListener("click", () => {

        getuserOrders(e.user_id).then(

            resp => {
                secionTwo.textContent = '';
                resp.forEach((e) => {
                    const test = createTRforD2(e);
                    test.addEventListener("click", () => {
                        // append order details
                        orderDetail.style.display = "block";

                    })
                    secionTwo.appendChild(test);
                })

            }
        );

        // const test=createTRforD2(data);
        // orders.appendChild(test);
        // ordersSecion.style.display.to
        ordersSecion.classList.toggle("active");
        // ordersSecion.style.display = "block";
    });
    d1.appendChild(item);
})
}
getAllUsersWithTotalMoney(1);
// let op = document.querySelector(".users");
// console.log(op[0].value);
// op[0].addEventListener("change", () => {
//     console.log(op[0].value);
// });
async function getuserOrders(id) {
    let formdata = new FormData();
    formdata.append("id", id);
    let res = await fetch("http://localhost/cafeteria/php/checks/try.php", {
        method: "post",
        body: formdata,
    });
    let data = await res.json();
    let x = data;

    return x;
}
let orderDetail = document.querySelector(".order-details");
let ordersSecion = document.querySelector(".user-order");
let secionTwo = document.querySelector(".user-order tbody");

res2.forEach((element) => {
    const item = createTRforD2(element);
    item.addEventListener("click", () => {
        //  send req to get res then foeach
        //
        orderDetail.style.display = "block";
    });
    secionTwo.appendChild(item);
});

let d1 = document.querySelector(".user-money tbody");
// console.log(d1);
// res.forEach((element) => {
//     const item = createTRforD1(element);
//     // var id=element.user_id;
//     item.addEventListener("click", () => {

//         getuserOrders(element.user_id).then(


//             resp => {
//                 secionTwo.textContent = '';
//                 resp.forEach((e) => {
//                     const test = createTRforD2(e);
//                     test.addEventListener("click", () => {
//                         // append order details
//                         orderDetail.style.display = "block";

//                     })
//                     secionTwo.appendChild(test);
//                 })

//             }
//         );

//         // const test=createTRforD2(data);
//         // orders.appendChild(test);
//         // ordersSecion.style.display.to
//         ordersSecion.classList.toggle("active");
//         // ordersSecion.style.display = "block";
//     });
//     d1.appendChild(item);
// });

// user.forEach((element) => {
//     element.addEventListener("click", () => {
//         ordersSecion.style.display = "block";
//     });
// });

function createTRforD1(obj) {
    const userTD = document.createElement("td");
    const moneyTD = document.createElement("td");
    userTD.innerText = obj.name;
    moneyTD.innerText = obj.total_money;
    const TR = document.createElement("tr");
    TR.appendChild(userTD);
    TR.appendChild(moneyTD);
    return TR;
}

function createTRforD2(obj) {
    const userTD = document.createElement("td");
    const moneyTD = document.createElement("td");
    userTD.innerText = obj.created_at;
    moneyTD.innerText = obj.total_price;
    const TR = document.createElement("tr");
    TR.appendChild(userTD);
    TR.appendChild(moneyTD);
    return TR;
}



// getuserOrders(2);

