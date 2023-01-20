<?php
require("./env.php");
require("./db.php");

$pageNo = $_POST['pageno'];

class avaliableProducts extends DB {
    public function __construct($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD)
    {
        parent::__construct($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);
    }
    public function selectAvaliblepage($tablename, $pagenum,$cond)
    {
        $rows_per_page = 5;
        $offset = $rows_per_page * ($pagenum - 1);
        try {
            $query = "SELECT * from $tablename Where $cond LIMIT  $rows_per_page  OFFSET $offset   ;";
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


$products=new avaliableProducts($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);
$allRows = $products->selectAvaliblepage("product",$pageNo,"status='avaliable'");
echo json_encode($allRows);