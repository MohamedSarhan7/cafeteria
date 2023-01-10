function Home(){
    window.open('./form.html',"_self")

}
function Products(){
    window.open('./form.html',"_self")

}
function Users(){
    window.open('./form.html',"_self")

}
function Manage(){
    window.open('./form.html',"_self")

}
function Checks(){
    window.open('./form.html',"_self")

}
async function getusername() {
    //console.log("rsjfxgfckfh");
    let res = await fetch("http://localhost:8080/php/adminOrder.php");
    let data = await res.json();
    console.log(data);
}

getusername();
