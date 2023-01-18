<?php
require_once("./env.php");
require_once("./db.php");
$db = new DB($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);
$cat=$_POST['category'];
$res = $db->insert("category", ["name" => $cat]);
$response = [];
if(!$res){
    $response = ["status" => false, "errors" => $res];
}else{
    $response = ["status" => true, "data" => "Category Added successflly"];

}
echo json_encode($response);
exit();

// 3270723