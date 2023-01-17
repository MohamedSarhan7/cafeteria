<?php
require("./env.php");
require("./db.php");
class myOrders extends DB{

    public function __construct($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD)
    {
        parent::__construct($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);
    }

    public function getall_data_of_order($id)
    {

        try {
            $query = " select p.id, p.name,p.avatar, po.qty, p.price 
            from product_orders po join product p join orders o on 
            o.id=$id and po.order_id=o.id and p.id=po.product_id ; ";
            $sql = $this->connection->prepare($query);
            $result = $sql->execute();
            $result = $sql->fetchall(PDO::FETCH_ASSOC);
            if (empty($result)) {
                return false;
            }
            return $result;
        } catch (Throwable $e) {
            return $e->getMessage();
        }
    }
}

$orderData= new myOrders(DATABASE, DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD);
$id= $_POST['orderID'];
 $displayOrder =$orderData->getall_data_of_order($id);
  echo json_encode($displayOrder);

 



