<?php
require("./connection.php");
$user_id=$_POST['userID'];
$query = "SELECT SUM(total_price) as total from orders where status !='canceled' GROUP BY userid;";
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