<?php
 require_once("./env.php");
 require_once("./db.php");

 class adminOrders extends DB{
    protected $rows_per_page = 4;

     public function __construct($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD)
     {
         parent::__construct($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);
     }

     public function selectorderdateusername($page){
        try{
            $offset = $this->rows_per_page * ($page - 1);
           $query= "SELECT  user.name  as 'user_name', orders.created_at , orders.id as 'order_id', orders.room, orders.status
           from user  join orders 
            on  user.id=orders.userid 
            order by orders.created_at desc
            limit $this->rows_per_page offset $offset ;";
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
    public function GetNumberOFOrdersPage()
    {
        try {

            $query = "SELECT count(orders.id)  as'total_rows' from orders ;";
            $sql = $this->connection->prepare($query);
            $result = $sql->execute();
            $result = $sql->fetchAll(PDO::FETCH_ASSOC);
            if (empty($result)) {
                return false;
            }
            $result = $result[0]['total_rows'] / $this->rows_per_page;
            return ceil($result);
        } catch (Throwable $e) {
            return $e->getMessage();
        }
    }

            

    ////////////////////////////////////////////////////
            public function popo($col_name1,$col_name2,$col_name3,$col_name4,$tablename1,$tablename2,$condition){
                try{
                    $query= "SELECT $col_name1,$col_name2,$col_name3,$col_name4 from $tablename1 inner join $tablename2 ON $condition;";
                    $sql = $this->connection->prepare($query);
                             $result = $sql->execute();
                             $result = $sql->fetchAll(PDO::FETCH_ASSOC);
                             if (empty($result)) {
                                 return false;
                             }
                             print_r(json_encode($result));
                             
                     }   catch (Throwable $e) {
                             return $e->getMessage();
                         }
            }
    //////////////////////////////////////////////////////////
    
    public function getall_data_of_order($id)
        {
            try {
                $query = " select p.id, p.name,p.avatar, po.qty, p.price ,o.total_price
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

 /////////////////////////////
 