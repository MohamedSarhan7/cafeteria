<?php  
require("./env.php");
require("./db.php");
$users = new DB(DATABASE, DATABASE_HOST, DATABASE_NAME, DATABASE_USER, DATABASE_PASS);
$data=$users->selectAll('user',"role <>'admin'");
echo json_encode($data);