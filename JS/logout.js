async function logout(){
    let res=await fetch("http://localhost/php/logout.php");
    let data= await res.json();
    if (data['status']==true){
        window.location.href = "http://localhost/index.html";
    }
    else{
        console.log(data);
    }
}