<?php
// phpinfo();
// require("../env.php");
require("../db.php");
// // stream_resolve_include_path(".:/usr/share/php");

// $db = new DB($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);

// $res=$db->selectpage("user , orders where user.id=2 and user.id=orders.userid ", 1);
// echo "<pre>";

// print_r($res);
// echo "</pre>";
class checks extends DB
{
    public function __construct($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD)
    {
        parent::__construct($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);
    }
    //  -- get user and total money he has spent
    public function getusers_pagenated_with_total_money_spended($pageN)
    {
        $rows_per_page = 5;
        $offset = $rows_per_page * ($pageN - 1);
        try {
            $query = "select u.id as'user_id', u.name ,sum(o.total_price) as 'total_money'
                    from user u join orders o  on u.id=o.userid  and o.status='done'
                    group by o.userid limit $rows_per_page offset $offset  ;";
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
//  get one user with total money
    public function get_one_with_total_money_spended($id)
    {
      
        try {
            $query = "select u.id as'user_id', u.name ,sum(o.total_price) as 'total_money'
                    from user u join orders o  on  u.id=$id and u.id=o.userid  and o.status='done'
                    group by o.userid  ;";
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
    // get all users that it's orders status done
    public function getusers_that_order_done()
    {
        
        try {
            $query = "select distinct u.id as'user_id', u.name 
                    from user u join orders o  on u.id=o.userid  and o.status='done' ;";
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
    //   -- get all orders of spac user

    public function getall_orders_of_user($id)
    {

        try {
            $query = " select  o.id as 'order_id',o.total_price ,o.created_at 
                from user u join orders o on  
                u.id=$id and o.userid=u.id and o.status='done'; ";
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

    //  -- get all data of spac order
    public function getall_data_of_order($id)
    {

        try {
            $query = " select p.id, p.name,p.avatar, po.qty, po.price 
            from product_orders po join product p join orders o on 
            o.id=$id and po.order_id=o.id and p.id=po.product_id and o.status='done'; ";
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


// $c = new checks('mysql', 'localhost', 'cafe', "root", "12345678");
// $res = $c->getusers_pagenated_with_total_money_spended(1);
// echo "<pre>";

// print_r(json_encode($res));
// echo "</pre>";


// $res = $c->getall_orders_of_user(2);
// echo "
// <pre>";

// print_r(json_encode($res));
// echo "</pre>";


// $res = $c->getall_data_of_order(2);
// echo "
// <pre>";

// print_r($res);
// echo "</pre>";

