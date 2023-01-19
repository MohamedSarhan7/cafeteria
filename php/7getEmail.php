 <?php
require("./env.php");
require("./db.php");
$users = new DB(DATABASE, DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD);
// $_SESSION[''];
$email =$_POST['email'] ;
 if($email == " "){
    echo json_encode(["Status"=> false]); 
    exit();
}
// if(){
// }

$user =$users->select_one_row("user","email = '$email'");
if($user){
    echo json_encode(["Status"=> TRUE]);
}
else{
    echo json_encode(["Status"=> false]);
}
  