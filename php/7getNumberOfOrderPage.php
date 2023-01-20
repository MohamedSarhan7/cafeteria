<?php
require("./env.php");
require("./db.php");
$id=7;
$orders = new DB($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);
$allRows = $orders->selectAll("orders ","userid = $id");
$noOfRows = (count($allRows) / 5);
echo $noOfRows;


