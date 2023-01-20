<?php
require("./env.php");
require("./db.php");
$products=new DB(DATABASE, DATABASE_HOST, DATABASE_NAME, DATABASE_USER, DATABASE_PASS);
$pageNo = $_POST['pageno'];
$allRows = $products->selectpage("product",$pageNo);
echo json_encode($allRows);