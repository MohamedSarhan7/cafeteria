<?php
session_start();
//Authentication
require_once("./env.php");
require_once('./db.php');
// ("./valid_user.php");

$db = new DB($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);

// validate all fields are required
$errors = [];
foreach ($_POST as $key => $value) {
    if (empty($value)) {
        $errors[$key] = "$key is required";
    }
}

if ($errors) {
    $responsToJS=["status"=>false,"data"=>$errors];
    echo json_encode($responsToJS);
    exit();
}


$email = $_POST['email'];
$password = $_POST['password'];
// validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors["email"] = "invalid email ";
    $responsToJS=["status"=>false,"data"=>$errors];
    echo json_encode($responsToJS);
    exit();
} 
// isva
// validate password
// $pass = $_POST['password'];
// if ((strlen($password))<8){
//     $errors["password"] = "password must be more than 8 characters";
//     $responsToJS=["status"=>false,"data"=>$errors];
//     echo json_encode($responsToJS);
//     exit();
// }




// $sql = 'mysql:host=localhost;dbname=coffee';
// $con = new PDO($sql, 'root', '80808580');

// $email = $_POST['email'];
// $password = $_POST['password'];

// $query = "SELECT * FROM user where email = :email and password = :password";
// $sql = $con->prepare($query);
// $sql->bindParam('email', $email);
// $sql->bindParam('password', $password);
// $sql->execute();
// $user = $sql->fetch();
$user = $db->select_one_row("user", "email = '$email' and password = '$password' ");
if ($user) {
    // login
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['role'] = $user['role'];
    $responsToJS=["status"=>true, "role" => $user['role']];
    echo json_encode($responsToJS);
    exit();
}else{
    $errors["password"] = "invalid email or password";
    
    $responsToJS=["status"=>false,"data"=>$errors];
    echo json_encode($responsToJS);
}






// session_start();
// require('./db.php');
// require("./db.php");
// $req = file_get_contents("php://iput")
// $email2  req['email']
// $email $_post['email']
// $file $_FILES['avatar']
// $email = $_REQUEST['email'];
// $password = sha1($_REQUEST['password']);
// $query = "SELECT * FROM users where email = :email and password = :password";
// $sql = $con->prepare($query);
// $sql->bindParam('email', $email);
// $sql->bindParam('password', $password);
// $sql->execute();
// $user = $sql->fetch();
// if ($user) {
//     // login
//     $_SESSION['user_id'] = $user['id'];
//     echo json_encode($aasd);
//     exit
//     // header('Location:profile.html');
// } else {
//     header('Location:login.html');
// }


// $db->store('users' , ['name'=>'','email'=>'']);

