<?php

// require("../env.php");
require_once("./db.php");

class checks extends DB
{
    protected $rows_per_page = 4;
    public function __construct($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD)
    {
        parent::__construct($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);
    }
    //  -- get user and total money he has spent
    public function getusers_pagenated_with_total_money_spended($pageN)
    {

        $offset = $this->rows_per_page * ($pageN - 1);
        try {
            $query = "select u.id as'user_id', u.name ,sum(o.total_price) as 'total_money'
                    from user u join orders o  on u.id=o.userid  and o.status='done'
                    group by o.userid limit $this->rows_per_page offset $offset  ;";
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

    public function get_total_number_of_users_pages()
    {

        try {
            $query =
                "select count(distinct u.id) as'total_rows'
                    from user u join orders o  on u.id=o.userid  and o.status='done' ;";
            $sql = $this->connection->prepare($query);
            $result = $sql->execute();
            $result = $sql->fetchall(PDO::FETCH_ASSOC);
            if (empty($result)) {
                
                return false;
            }
            $result = $result[0]['total_rows'] / $this->rows_per_page;

            
            return ceil($result);
        } catch (Throwable $e) {
            return $e->getMessage();
        }
    }


    public function get_total_number_of_users_pages_admin()
    {

        try {
            $query =
                "select count(id) as'total_rows'
                    from user where role <> 'admin' ;";
            $sql = $this->connection->prepare($query);
            $result = $sql->execute();
            $result = $sql->fetchall(PDO::FETCH_ASSOC);
            if (empty($result)) {

                return false;
            }
            $result = $result[0]['total_rows'] / $this->rows_per_page;


            return ceil($result);
            // return $result;
        } catch (Throwable $e) {
            return $e->getMessage();
        }
    }
    
    

    public function get_inValidRooms(){

        try {
            $query =
                "select room as'rooms'from user ;";
            $sql = $this->connection->prepare($query);
            $result = $sql->execute();
            $result = $sql->fetchall(PDO::FETCH_ASSOC);
            if (empty($result)) {

                return false;
            }
            // $result = $result[0]['total_rows'] / $this->rows_per_page;

            $rooms = [];
            foreach($result as $key => $value){
                // $rooms[] = $value;
                array_push($rooms, $value['rooms']);
            }
            return $rooms;
        } catch (Throwable $e) {
            return $e->getMessage();
        }
    }
}


// $c = new checks('mysql', 'localhost', 'cafe', "root", "12345678");

// $res = $c->get_inValidRooms();
// echo "<pre>";

// print_r(json_encode($res));
// echo "</pre>";


// $res = $c->get_total_number_of_users_pages();
// echo "<pre>";

// print_r(json_encode($res));
// echo "</pre>";
// echo 6 / 4;

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
