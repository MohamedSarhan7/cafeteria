<?php
require("./env.php");
require("./db.php");
$passwords = new DB(DATABASE, DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD);
$password =$_POST['password'];
$confirmPassword =$_POST['ConfirmPassword'];
$userId =6 ;
  if($password == " "){
     echo json_encode(["Status" , "false"]);
     exit();
  }
  else if($password != $confirmPassword){
    echo json_encode(["Status" , "false"]);
     exit();
  } 
  $passwordReset = $passwords->update("user","$userId", ["password"=>$password]);
   if($passwordReset){
    echo json_encode(["Status" => "passwordUpdated"]);
   }
   else
   {
    echo json_encode(["Status" => "false"]);
   }