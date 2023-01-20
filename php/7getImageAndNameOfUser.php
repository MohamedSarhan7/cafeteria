<?php
session_start();
require("./env.php");
require("./db.php");
$users = new DB($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);
// $_SESSION[''];
$id_user =3 ;
if($id_user != 1){
    $user =$users->select_one_row("user","id = $id_user");
    echo json_encode($user);
}
else{
    echo json_encode(["error"=> "false"]);  
}   
