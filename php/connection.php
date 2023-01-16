<?php
include './env.php';
$sql = DATABASE . ':host=' . DB_HOST . ';dbname=' . DB_NAME;
$con = new PDO($sql, DB_USERNAME, DB_PASSWORD);