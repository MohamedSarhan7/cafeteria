<?php 
// session_start();
require("./env.php");
require("./db.php");
$id = $_SESSION['user_id'];
// $id=2;   
$sql = $DATABASE . ':host=' . $DATABASE_HOST . ';dbname=' . $DATABASE_NAME;
$con = new PDO($sql, $DATABASE_USERNAME, $DATABASE_PASSWORD);
$query="SELECT p.name,p.price,p.id,p.avatar,po.qty FROM product p 
JOIN product_orders po ON p.id=po.product_id
WHERE status='avaliable' and po.order_id = (SELECT max(o.id) 
FROM orders o
WHERE o.userid='$id') LIMIT 2;";
$sql=$con->prepare($query);
$result=$sql->execute();
$data=$sql->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($data);