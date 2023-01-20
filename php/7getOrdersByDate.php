<?php
require("./env.php");
require("./db.php");
class ordersDate extends DB{
    public function __construct($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD)
    {
        parent::__construct($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);
    }

    public function getOrdersByDate($dateFrom, $dateTo ,$userId)
    {
        try {
            $query = "select  * from  orders  where  
            date(created_at) >= '$dateFrom' and 
            date(created_at) <= '$dateTo' and userid = $userId;";
            $sql = $this->connection->prepare($query);
            $result = $sql->execute();
            $result = $sql->fetchAll(PDO::FETCH_ASSOC);
            if (empty($result)) {
                return false;
            }
            return $result;
        } catch (Throwable $e) {
            return $e->getMessage();
        
        }
    }
}
$orderDateFilter= new ordersDate($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);
$userId =7;
$dateFrom =$_POST['dateFrom'];
$dateTo =$_POST['dateTo'];
 $displayOrder =$orderDateFilter->getOrdersByDate($dateFrom,$dateTo,$userId);
 if($displayOrder){
      echo json_encode(["Status" => "true" ,"data" =>$displayOrder]);
      
 }
 else{
    echo json_encode(["Status" => "false"]);
 }
  









