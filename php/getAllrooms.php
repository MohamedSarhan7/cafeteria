<?php  
require("./env.php");
require("./db.php");

class getRooms extends DB {
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

    public function selectAllRooms($tablename,$colname ,$condition = '')
    {
        try {
            $query = "SELECT $colname from $tablename where $condition ;";
            if ($condition == '') {
                $query = "SELECT $colname from $tablename  ;";
            }

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

$rooms = new getRooms($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);
$data=$rooms->selectAllRooms('user','room',"role <>'admin'");
echo json_encode($data);