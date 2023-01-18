<?php
require_once("./env.php");

require_once("./checksDB.php");
// echo "sadasd";
// phpinfo();
$page = $_POST['page'];
// print_r(json_encode($id));
$db = new checks($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);
// $db = new checks('mysql', 'localhost', 'cafe', "root", "12345678");
$res = $db->getusers_pagenated_with_total_money_spended($page);
echo json_encode($res);
// exit();
