<?php
require("./env.php");
require("./db.php");
$orders = new DB(DATABASE, DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD);
$id=$_POST['id_order'];
$orderDeleted = $orders->cancel_order($id);
echo json_encode($orderDeleted);