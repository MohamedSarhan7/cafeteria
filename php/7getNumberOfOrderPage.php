<?php
session_start();
require("./env.php");
require("./db.php");
$id_user = $_SESSION['user_id'];

$orders = new DB($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);
$allRows = $orders->selectAll("orders ","userid = $id_user");
$noOfRows = (count($allRows) / 4);
echo ceil($noOfRows);


