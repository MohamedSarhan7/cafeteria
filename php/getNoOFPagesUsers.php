<?php
require("./env.php");
require("./db.php");
$id=3;
$orders = new DB(DATABASE, DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD);
$allRows = $orders->selectAll("orders ","userid = $id");
$noOfRows = (count($allRows) / 5);
echo $noOfRows;


