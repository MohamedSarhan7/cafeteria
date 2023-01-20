<?php
require("./env.php");
require("./db.php");
$products=new DB($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);
$allRows = $products->selectAll("product","status='avaliable'");
$noOfRows = (count($allRows) / 5);
echo $noOfRows;