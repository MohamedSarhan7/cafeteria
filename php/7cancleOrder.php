<?php
require("./env.php");
require("./db.php");
$orders = new DB($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);
$id=$_POST['id_order'];
$orderDeleted = $orders->cancel_order($id);
echo json_encode($orderDeleted);