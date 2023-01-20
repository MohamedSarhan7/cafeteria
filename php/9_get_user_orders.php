<?php
require_once("./env.php");

require_once("./checksDB.php");
// session_start();
// if(empty($_SESSION['dsa'])){
//     header("location:http://localhost/cafeteria/index.html");
//         exit();
// }
// echo "sadasd";

$id = $_POST['id'];
// print_r(json_encode($id));
$db = new checks($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);
// $db = new checks('mysql', 'localhost', 'cafe', "root", "12345678");
$res = $db->getall_orders_of_user($id);
echo json_encode($res);
// exit();


