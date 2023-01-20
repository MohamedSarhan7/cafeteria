<?php
require_once("./env.php");

require_once("./checksDB.php");
// echo "sadasd";
// phpinfo();
// $page = $_POST['page'];
// print_r(json_encode($id));
$db = new checks($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);
// $db = new checks('mysql', 'localhost', 'cafe', "root", "12345678");
$res = $db->get_total_number_of_users_pages();
// echo json_encode(["number_of_pages"=>$res]);
echo json_encode($res);
