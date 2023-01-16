
<?php
require("./env.php");
require("./db.php");

$orders = new DB(DATABASE, DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD);

$allRows = $products->selectAll("product");

$noOfRows = (count($allRows) / 5);
echo $noOfRows;