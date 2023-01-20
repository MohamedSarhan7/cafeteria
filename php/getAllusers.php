<?php  
require("./env.php");
require("./db.php");
$users = new DB($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);
$data=$users->selectAll('user',"role <>'admin'");
echo json_encode($data);