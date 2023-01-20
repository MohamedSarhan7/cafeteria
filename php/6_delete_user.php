<?php
require_once("./env.php");

require_once("./db.php");
// echo "sadasd";
// phpinfo();
$id = $_POST['id'];
// print_r(json_encode($id));
$db = new DB($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);
$res = $db->delete("user", $id);
$response = [];
if (!$res) {
    $response = ["status" => false, "errors" => "erroeor"];
} else {
    $response = ["status" => true, "data" => "User Deleted successflly"];
}

echo json_encode($response);
exit();
