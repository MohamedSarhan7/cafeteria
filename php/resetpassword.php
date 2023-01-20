<?php
require_once("./env.php");

require_once("./db.php");
require_once("./valid_user.php");

$errors=[];

foreach ($_POST as $key => $value) {
    if (empty($value)) {
        $errors[$key] = "$key is required";
    }
}

check($errors);
$email = $_POST['email'];
$pass1 = $_POST['pass1'];
$pass2 = $_POST['pass2'];
checkPassoword($pass1, $pass2, $errors);
$db = new DB($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);


$id=$db->select_one_row("user","email = '$email' ");
$res = $db->update("user", $id['id'], ["password" => $pass1]);
$response = [];
if (!$res) {
    $response = ['status' => false];
} else {
    $response = ['status' => true];
}
echo json_encode($response);
exit();
