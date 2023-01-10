
let ava = document.getElementById("ava");
let ava2 = document.getElementById("available");
var edit = document.getElementsByClassName("edit");
// let image = document.getElementById("image");
// let imgInput = document.getElementById("imgInput");


console.log(image);
console.log(imgInput);
function Available(){
    document.getElementById("ava").style.cssText='display: none;';
    document.getElementById("available").style.cssText='display: block;';
}

function editt(){
    document.getElementById("image").style.display = "none";
    document.getElementById("imgInput").style.display = "block";

    document.getElementById("money").style.cssText='display: none;';
    document.getElementById("input1").style.cssText='display: block;';

    document.getElementById("pro").style.display = "none";
    document.getElementById("input2").style.cssText='display: block;';
}

async function req (p){
    let sentDATA =new FormData();
    sentDATA.append("pageno",`${p.innerHTML}`);
    let res=await fetch ("http://localhost:85/php/getProductByPage.php",{
        method:"POST",
        body:sentDATA,
    })
    let d=await res .json();
    console.log(d);
}


async function getNoOfPages()
{
    let response=await fetch("http://localhost:85/php/AllProduct.php");
    let data=await response.json();
    for (let i=0;i<data;i++)
    {
        let p=document.createElement("p");
        p.innerHTML=i+1;
        document.querySelector(".changeProducts").append(p);
        p.addEventListener("click",()=>{
            req(p);
            
            
        })

    } 

}

getNoOfPages();






// const person = {
//     firstName: "John",
//     lastName: "Doe",
//     age: 50,
//     eyeColor: "blue"
//   };

var img=document.getElementById("img1");
var i=0;
img.setAttribute("src",arr[i]);

function forward()
{
    i++;
    if(i>=arr.length)
    {
        i=0;
    }
    img.setAttribute("src",arr[i]);
}

function back()
{
    i--;
    if(i <0)
    {
        i=(arr.length - 1);
    }
    img.setAttribute("src",arr[i]);
}

var im = document.getElementsByClassName("im");
// console.log(im);
function myFunction() {
    for (let index = 0; index < phone.length; index++) {
        im[index].src = phone[index];
    }
}
    function myFunction1() {
    for (let index = 0; index < clothes.length; index++) {
        im[index].src = clothes[index];
    }
    }
    function myFunction2() {
        for (let index = 0; index < shoes.length; index++) {
            im[index].src = shoes[index];
        }
        }
        function myFunction3() {
            for (let index = 0; index < shoes.length; index++) {
                im[index].src = makeUp[index];
            }
            }
            const addCart = document.querySelectorAll(".add-cart");
            // console.log(addCart);

            for (let index = 0; index < addCart.length; index++) {
                addCart[index].addEventListener('click', () => {
                    cartCount()
                })

            }
            
            const cartShow = document.querySelector("#navbar .nav a");
            console.log(cartShow);
            function cartCount(){
                let preCount = localStorage.getItem('cartsCount');
                preCount = parseInt(preCount);
                // console.log(preCount);
                if(preCount){
                    localStorage.setItem('cartsCount', preCount + 1);
                    cartShow.textContent = preCount + 1;
                }else{
                    localStorage.setItem('cartsCount', 1);
                    cartShow.textContent = 1;

                }
            }
            // function displayCart(){
            //     let preCount = localStorage.getItem('cartsCount');
            //     if(preCount){
            //         cartCount.show.textContent = preCount;
            //     }
            //     displayCart(): void
            // }
            // displayCart();
            // console.log(btn);
            // window.localStorage.setItem("btn")
            //////////////////////////////////////
            var span = document.querySelector(".up");
            // console.log(span);
            window,onscroll = function(){
                // console.log(this.scrollY);
                if(this.scrollY >= 1000){
                    span.classList.add("show");
                }else {
                    span.classList.remove("show");
                }
            }


            span.onclick = function(){
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                })
            };


img.setAttribute("src",phone[i]);

// function swap(){
//     $("im"[0]).attr("src",phone[0].attr("src"));
//     }
// $("#phone").on({"click": });