<?php
require("./env.php");
require("./10_class.php");

$users = new adminOrders($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);

$data=$users->selectorderdateusername();
print_r(json_encode($data));









