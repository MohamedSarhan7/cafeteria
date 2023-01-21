<?php
// 10_get_total_number_of_pages.php -->
require("./env.php");
require("./10_class.php");
$users = new adminOrders($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);
$data = $users->GetNumberOFOrdersPage();
print_r(json_encode($data));
