<?php
require("./db.php");

//$pros=selectAll("orders", "status='proccessing'");


//  get all data

// $data = $users->selectAll("orders", "status='proccessing'");
// echo "<pre>";
// print_r($data);
// echo "</pre>";

// $data = $users->select_one_row("user", "name = 'userY'");
// echo "<pre>";
// print_r($data);
// echo "</pre>";

// $result = $users->change_order_status(3, "out_for_delivery");



$data=$users->selectorderdateusername('created_at','name','orders','user',"userid=user.id");
echo "<pre>";
print_r($data);
echo "</pre>";






// public function select_one_row($tablename, $condition)
//     {
//         try {
//             $query = "SELECT * from $tablename where $condition ;";
//             $sql = $this->connection->prepare($query);
//             $result = $sql->execute();
//             $result = $sql->fetch(PDO::FETCH_ASSOC);
//             if (empty($result)) {
//                 return false;
//             }
//             return $result;
//         } catch (Throwable $e) {
//             return $e->getMessage();
//         }
//     }


