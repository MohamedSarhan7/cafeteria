<?php
require("./env.php");
require("./db.php");
$products=new DB(DATABASE, DATABASE_HOST, DATABASE_NAME, DATABASE_USER, DATABASE_PASS);
$data=$_POST['search'];
if (!empty($data))
{
    $matchedProducts = $products->selectAll("product","name LIKE '$data%'");
echo json_encode($matchedProducts);
}
else{
    echo json_encode(false);
}
