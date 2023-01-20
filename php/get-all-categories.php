<?php
require("./env.php");
require("./db.php");

$Categories = new DB($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);

$data = $Categories->selectAll("category", "");
echo json_encode($data);