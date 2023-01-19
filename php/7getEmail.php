 <?php
require("./env.php");
require("./db.php");
$users = new DB(DATABASE, DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD);
// $_SESSION[''];
$email =$_POST['email'] ;
 if($email != ""){
    $user =$users->select_one_row("user","email = '$email'");
    echo json_encode($user);
}
else{
    echo json_encode(["error"=> "false"]);  
}   

