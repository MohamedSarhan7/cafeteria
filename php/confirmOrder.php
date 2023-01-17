<?php
//session_start();
require("./env.php");
require("./db.php");
// $id=$_SESSION['user-id'];
$orders = new DB(DATABASE, DATABASE_HOST, DATABASE_NAME, DATABASE_USER, DATABASE_PASS);
$id=2;
$data = file_get_contents('php://input');
$data = json_decode($data, true);
$room=$data['room'];
$note=$data['note'];
$products=$data['products'];
if ($room =='Rooms') {
    $userData = $orders->select_one_row("user", "id = '$id'");
    $room=$userData['room'];
}
if (count($products)==0) {
    echo 0;
    exit ();
}
$result=$orders->create_order($id,$room,$note,$products);
echo $result;