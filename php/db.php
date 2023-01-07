<?php
require("./env.php");
class DB
{
    public $DATABASE;
    public $DATABASE_HOST;
    public $DATABASE_NAME;
    public $DATABASE_USERNAME;
    public $DATABASE_PASSWORD;
    public $connection;
    // public $mainsql;
    public function __construct($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD)
    {
        $this->DATABASE = $DATABASE;
        $this->DATABASE_HOST = $DATABASE_HOST;
        $this->DATABASE_NAME = $DATABASE_NAME;
        $this->DATABASE_USERNAME = $DATABASE_USERNAME;
        $this->DATABASE_PASSWORD = $DATABASE_PASSWORD;

        $sql = $this->DATABASE . ":host=" . $this->DATABASE_HOST . ";dbname=" . $this->DATABASE_NAME . ";";
        $this->connection = new PDO($sql, $this->DATABASE_USERNAME, $this->DATABASE_PASSWORD);
    }

    public function selectAll($tablename)
    {
        try {
            $query = "SELECT * from $tablename  ;";

            $sql = $this->connection->prepare($query);
            $result = $sql->execute();
            $result = $sql->fetchall(PDO::FETCH_ASSOC);
            if (empty($result)) {
                return "Not found or Empty";
            }
            return $result;
        } catch (Throwable $e) {
            return $e->getMessage();
        }
    }
    public function selectpage($tablename, $pagenum)
    {
        $rows_per_page = 5;
        $offset = $rows_per_page * ($pagenum - 1);
        try {
            $query = "SELECT * from $tablename LIMIT  $rows_per_page  OFFSET $offset  ;";
            // echo $query;
            $sql = $this->connection->prepare($query);
            $result = $sql->execute();
            $result = $sql->fetchall(PDO::FETCH_ASSOC);
            if (empty($result)) {
                return "Not found or Empty";
            }
            return $result;
        } catch (Throwable $e) {
            return $e->getMessage();
        }
    }
    public function select_one_row($tablename, $condition)
    {
        try {
            $query = "SELECT * from $tablename where $condition ;";
            $sql = $this->connection->prepare($query);
            $result = $sql->execute();
            $result = $sql->fetch(PDO::FETCH_ASSOC);
            if (empty($result)) {
                return
                    "Not found or Empty";
            }
            return $result;
        } catch (Throwable $e) {
            return $e->getMessage();
        }
    }

    private function insertStmt($arr)
    {
        $col_name = '(';
        $data = "('";

        foreach ($arr as $key => $value) {
            $col_name .= $key . ",";
            $data .= $value . "','";
        }
        $col_name = substr_replace($col_name, "", -1);
        $data = substr_replace($data, "", -2);


        $col_name .= ")";
        $data .= ")";
        return $col_name . " values " . $data;
    }


    public function validate_email_in_db($email)
    {
        try {
            $res = $this->select_one_row('user', "email='$email'");
            if (gettype($res) == "array") {
                if (!empty($res)) {
                    return false; // email exist
                }
            }
            return true;
        } catch (Throwable $e) {
            return $e->getMessage();
        }
    }

    public function insert($tablename, $arr)
    {
        try {
            $stmt = $this->insertStmt($arr);
            $query = "insert into  $tablename  $stmt ;";
            $sql = $this->connection->prepare($query);
            $result = $sql->execute();
            return $result;
        } catch (Throwable $e) {
            return $e->getMessage();
        }
    }


    public function create_order($user_id, $note, $order_in_arr)
    {


        try {
            $order = json_encode($order_in_arr);
            $query = "call create_order($user_id,'$note','$order');";
            $sql = $this->connection->prepare($query);
            $result = $sql->execute();
            return $result;
        } catch (Throwable $e) {
            return $e->getMessage();
        }
    }




    public function update($table_name, $id, $obj)
    {
        try {
            $str = $this->conditionFun($obj);
            $query = "UPDATE `$table_name` set $str
        WHERE id='$id' ";
            $sql = ($this->connection)->prepare($query);
            $result = ($sql)->execute();
            return true;
        } catch (Exception $e) {
            return  $e->getMessage();
        }
    }





    private function conditionFun($condition)
    {

        $str = '';
        foreach ($condition as $key => $value) {
            $str = $str . $key . '=' . "'" . $value . "'" . ',';
        }
        $str = rtrim($str, ",");
        return $str;
    }

    //  delete row
    public function delete($tablename, $id)
    {
        try {
            $query = "DELETE FROM `$tablename` WHERE id= $id;";
            $sql = ($this->connection)->prepare($query);
            $result =  ($sql)->execute();
            return $result;
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }
    public function cancel_order($id)
    {
        // check order status to make it canceld
    }
}







$users = new DB($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);


// //  get all data

// $data = $users->selectAll("user");
// echo "<pre>";
// print_r($data);
// echo "</pre>";

// select page
// $data = $users->selectpage("user",2);
// echo "<pre>";
// print_r($data);
// echo "</pre>";


// // get single row

// $data = $users->select_one_row("user", "namasdae = 'userY'");
// echo "<pre>";
// print_r($data);
// echo "</pre>";

// // insert

// $result = $users->insert("user", [
//     "name" => "user123@gmial.com",
//     "password" => "12345678",
//     "email" => time()."user@gmial.com",
//     // "avatar"=>"test"
// ]);

// echo gettype($result);
// echo "<hr><br>insert result:   " . $result;


// create_order
// $result = $users->create_order(7, "test err in prsadasddsadado id", [
//     ["product_id"=>"44","qty"=>"3"],
//     ["product_id" => "2", "qty" => "1"]
// ]);
// echo "<hr><br>create order:   " . $result;

// // update

// $result = $users->update("user", 15,
//     [    
//     "name" => "mohamed",
//     "email" => "blabla@m.com"
//     ],
    
// );
// echo "<hr><br>update result:   " . $result;

// // delete

// $result = $users->delete("user", 15);

// echo "<hr><br>delete result:   ".$result;
