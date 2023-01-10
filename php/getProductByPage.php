<?php
require("./db.php");

$products = new DB("mysql", "localhost:3306", "myschema", "root", "MohaMMad0");
$pageNo = $_POST['pageno'];
$allRows = $products->selectpage("product",$pageNo);
echo json_encode($allRows);