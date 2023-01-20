<?php
require_once('./env.php');
require_once("./db.php");

$db = new DB($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);
$res = $db->selectAll("category");
if ($res) { 
    $responsToJS=["status"=>true,"data"=> $res];
}else{
    $errors["picture"] = "the are some errors, try agian";
    $responsToJS=["status"=>false,"data"=>$errors];
}
echo json_encode($responsToJS);
exit();