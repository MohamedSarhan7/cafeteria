
<?php

require("./db.php");

$products = new DB("mysql", "localhost:3306", "myschema", "root", "MohaMMad0");

$allRows = $products->selectAll("product");

$noOfRows = (count($allRows) / 5);
echo $noOfRows;