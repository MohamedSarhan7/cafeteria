<?php
require("./env.php");
require("./db.php");   
$users = new DB(DATABASE, DATABASE_HOST, DATABASE_NAME, DATABASE_USER, DATABASE_PASS);
$data = $users->select_one_row("user", "id = '2'");
echo json_encode($data);

