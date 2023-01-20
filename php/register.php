<?php
session_start();

require_once("./env.php");
require_once("./checksDB.php");
require_once("./valid_user.php");
$db = new checks($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);

// session_start();
// =======================================================
//  for user reg
// if(!empty($_SESSION['loged'])){
//     $response = ["status" => true,"loged"=>true];
//     exit();
// }
// ==================================================




$errors = [];
$response = [];


$username = $_POST["username"];
$password = $_POST["password"];
$password_confirm = $_POST["confirm_password"];
$room = $_POST["room"];
$email = $_POST['email'];
$res = isValidUser($errors, $db);
if ($res['status'] == false) {
    echo json_encode($res);
    exit();
}

$user = [
    "name" => $username,
    "password" => $password,
    "email" => $email,
    "room" => $room,
    "avatar" => $full_path
];

$result = $db->insert('user', $user);
// if(gettype())
$user = $db->select_one_row("user", "email = '$email' ");
$_SESSION['user_id'] = $user['id'];
$_SESSION['role'] = $user['role'];
echo json_encode(["status" => true, "data" => "User added successfully"]);
exit();
