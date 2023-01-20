<?php
require_once("./env.php");
require_once("./db.php");
$id = $_POST['id'];
$status = $_POST['status'];
if ($status=="avaliable"){
    $status="not_avaliable";
}
else {
    $status="avaliable";
}
$db = new DB($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);
$res = $db->update("product", $id,["status"=>$status]);
$response = [];
if (!$res) {
    $response = ["status" => false, "errors" => "erroeor"];
} else {
    $response = ["status" => true, "data" => "User Deleted successflly"];
}

echo json_encode($response);
exit();