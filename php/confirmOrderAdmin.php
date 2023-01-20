<?php
//session_start();
require("./env.php");
require("./db.php");
$orders = new DB(DATABASE, DATABASE_HOST, DATABASE_NAME, DATABASE_USER, DATABASE_PASS);
$data = file_get_contents('php://input');
$data = json_decode($data, true);
$room=$data['room'];
$note=$data['note'];
$products=$data['products'];
$id=$data["id"];
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