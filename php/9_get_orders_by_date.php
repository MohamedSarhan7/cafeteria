<?php
require_once("./env.php");

require_once("./checksDB.php");


$datefrom = $_POST['datefrom'];
$dateto = $_POST['dateto'];

$db = new checks($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);
$res = $db->get_orders_by_date($datefrom, $dateto);
$response = [];
if (!$res) {
    $response = ['status' => false,"data"=>"there is no finished orders in this period"];
} else {
    $response = ['status' => true, "data" => $res];
}
echo json_encode($response);
exit();
// echo json_encode($res);

// select  o.id as 'order_id',o.total_price ,o.created_at 
// from  orders o where  
// date(o.created_at)>="2023:01:01 00:00:00" and date(o.created_at) <= "2023:01:08 00:00:00" and o.status='done';
