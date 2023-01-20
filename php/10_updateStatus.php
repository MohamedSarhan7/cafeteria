<?php
require("./env.php");
require_once("./db.php");


$users = new DB ($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);

$orderid=$_POST['orderID'];
$orderstatus=$_POST['orderstatus'];
$data=$users->change_order_status($orderid,$orderstatus);
$response=["status"=>$data];
print_r(json_encode($response));