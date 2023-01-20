<?php
require_once("./env.php");

require_once("./db.php");
// echo "sadasd";
// phpinfo();
$page = $_POST['page'];
// print_r(json_encode($id));
$db = new DB($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);
// $db = new checks('mysql', 'localhost', 'cafe', "root", "12345678");
$res = $db->selectpage('user where role = "user" ',$page);
echo json_encode($res);
// exit();
