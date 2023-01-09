<?php
require_once("../env.php");

require_once("./test.php");
// echo "sadasd";
// phpinfo();
$id = $_POST['id'];
// print_r(json_encode($id)); php/checks/get_one_user_with_total_money.php
// $db = new checks($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);
$db = new checks('mysql', 'localhost', 'cafe', "root", "12345678");
$res = $db->get_one_with_total_money_spended($id);
echo json_encode($res);
