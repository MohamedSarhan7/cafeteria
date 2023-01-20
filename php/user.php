<?php
session_start();
require_once("./env.php");
require_once("./db.php");

$response = [];
if ($_SESSION['user_id']) {
    $id=$_SESSION['user_id'];
    $db = new DB($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);
    $user = $db->select_one_row("user", "id = $id ");
    if($user){
        $response = ["status" => true, "data" => ["name" => $user['name'], "avatar" => $user['avatar']]];
    }else{
        $response = ["status" => false, "data" => "user not found"];
        
    }
    
    
}else{

    $response = ["status" => false, "data" => "user not found"];
}

echo json_encode($response);
exit();