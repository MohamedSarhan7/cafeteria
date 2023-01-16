<?php
session_start();
require("./env.php");
require("./db.php");
$users = new DB(DATABASE, DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD);
// $_SESSION[''];
$id_user =6 ;
if($id_user != 1){
    $user =$users->select_one_row("user","id = $id_user");
    echo json_encode($user);
}
else{
    echo json_encode(["error"=> "false"]);  
}   
