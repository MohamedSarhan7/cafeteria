<?php
require_once("./env.php");

require_once("./db.php");

$email = $_POST['email'];
$db = new DB($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);
$res = $db->validate_email_in_db($email);
$response = [];
if(!$res){
    $response = ['status' => true];
}else{
    $response = ['status' => false,"errors"=>"Email not found"];

}
echo json_encode($response);
exit();
