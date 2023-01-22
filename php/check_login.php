<?php
session_start();

$response = [];
if (isset($_SESSION['user_id'])) {
    $id   = $_SESSION['user_id'];
    $role = $_SESSION['role'];
    
        $response = ["status" => true, "role" =>$role];
    }
else {

    $response = ["status" => false, "data" => "user not found"];
}

echo json_encode($response);
exit();
