<?php
require("./env.php");
require("./db.php");

// class getPage extends DB{
    
//     public function __construct($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD)
//     {
//         parent::__construct($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);
//     }

//     public function selectpage($tablename, $pagenum)
// {
//     $rows_per_page = 5;
//     $offset = $rows_per_page * ($pagenum - 1);
//     try {
//         $query = "SELECT * from $tablename WHERE status !='canceled' LIMIT  $rows_per_page  OFFSET $offset  ;";
//         $sql = $this->connection->prepare($query);
//         $result = $sql->execute();
//         $result = $sql->fetchall(PDO::FETCH_ASSOC);
//         if (empty($result)) {
//             return false;
//         }
//         return $result;
//     } catch (Throwable $e) {
//         return $e->getMessage();
//     }
// }

// }
$orders = new DB(DATABASE, DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD);
$pageNo = $_POST['Page_No'];
$id=3;
$allRows = $orders->selectpage("orders where userid = $id ",$pageNo);
echo json_encode($allRows);