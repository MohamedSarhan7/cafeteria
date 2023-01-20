<?php
require("./env.php");
require("./db.php");
$products=new DB(DATABASE, DATABASE_HOST, DATABASE_NAME, DATABASE_USER, DATABASE_PASS);
$allRows = $products->selectAll("product");
$noOfRows = (count($allRows) / 5);
echo $noOfRows;