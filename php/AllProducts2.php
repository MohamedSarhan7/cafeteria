<?php
require("./env.php");
require("./db.php");
$products=new DB($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);
$allRows = $products->selectAll("product");
$noOfRows = (count($allRows) / 4);
echo ceil($noOfRows);