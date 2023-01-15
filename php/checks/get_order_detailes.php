<?php
require_once("../env.php");

require_once("./checksDB.php");
// echo "sadasd";
// phpinfo();
$id = $_POST['id'];
// print_r(json_encode($id));
$db = new checks($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);
// $db = new checks('mysql', 'localhost', 'cafe', "root", "12345678"); 
$res = $db->getall_data_of_order($id);
echo json_encode($res);