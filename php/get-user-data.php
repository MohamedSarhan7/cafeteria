<?php
// session_start();
require("./env.php");
require("./db.php");
// $id=$_SESSION['user-id']   
$users = new DB(DATABASE, DATABASE_HOST, DATABASE_NAME, DATABASE_USER, DATABASE_PASS);
$id=2;
$data = $users->select_one_row("user", "id = '$id'");
echo json_encode($data);

