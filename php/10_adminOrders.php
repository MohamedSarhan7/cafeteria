<?php
require("./env.php");
require("./10_class.php");
$page = $_POST['page'];
$users = new adminOrders($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);
//  edit

$data=$users->selectorderdateusername($page);
print_r(json_encode($data));









