<?php
require("./env.php");
require("./10_class.php");

$users = new adminOrders($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);

 $id= $_POST['orderID'];
 $displayOrder =$users->getall_data_of_order($id);
  print_r(json_encode($displayOrder)) ;


        


