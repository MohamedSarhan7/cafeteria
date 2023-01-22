<?php
session_start();
require ('./env.php');
$sql = $DATABASE . ':host=' . $DATABASE_HOST . ';dbname=' . $DATABASE_NAME;
$con = new PDO($sql,$DATABASE_USERNAME,$DATABASE_PASSWORD);

$user_id = $_POST['userID'];
$user_id=$_SESSION['user_id'];

$query = "SELECT SUM(total_price) as total from orders where userid= $user_id;";
$sql = $con->prepare($query);
$sql->execute();
$user = $sql->fetchall();
      if($user){
        echo json_encode($user);     
      }
      else
      {
        echo json_encode(["error"=> "false"]);  
      }