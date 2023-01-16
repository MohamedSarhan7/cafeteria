<?php
session_start();
 require("./env.php");
 require("./db.php");
 $order = new DB(DATABASE, DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD);
 $id_user =6;
 $orders =$order->selectpage("orders"," userid = $id_user ;");
echo json_encode($orders);
