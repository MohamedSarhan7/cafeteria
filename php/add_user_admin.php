<?php

// echo json_encode(["sdaas" => "sdad"]);
// exit();
require("http://localhost/php/env.php");
require("./db.php");

// session_start();
// =======================================================
//  for user reg
// if(!empty($_SESSION['loged'])){
    //     $response = ["status" => true,"loged"=>true];
    //     exit();
    // }
    // ==================================================
    
    function isValidPassword($password)
    {
        if (!preg_match_all('$\S*(?=\S{8,})(?=\S*[a-z])(?=\S*[A-Z])(?=\S*[\d])(?=\S*[\W])\S*$', $password))
            return FALSE;
        return TRUE;
    }
    
    
    /*
        Regular Expression: $\S*(?=\S{8,})(?=\S*[a-z])(?=\S*[A-Z])(?=\S*[\d])\S*$
        $ = beginning of string
        \S* = any set of characters
        (?=\S{8,}) = of at least length 8
        (?=\S*[a-z]) = containing at least one lowercase letter
        (?=\S*[A-Z]) = and at least one uppercase letter
        (?=\S*[\d]) = and at least one number
        $ = end of the string
        */
        
        
        function checkPassoword($password,$password_confirm,$errors){
            
        if(isValidPassword($password)==false){
            $errors['password'] = "password is invalid";
        }
        elseif(isValidPassword($password_confirm)==false){
            $errors['confirm_password'] = "password is invalid";
        } 
        elseif ($password!=$password_confirm){
            $errors['confirm_password'] = "password is doesn't match" ;
        }
        check($errors);
    }
    
    function check($errors)
    {
        if ($errors) {
            $response = [
                "status" => false,
                "errors" => $errors
            ];
            echo json_encode($response); //return to js
            exit(); //
    
        }
    }
    


    $errors = [];
    $response = [];
    
    $username = $_POST["username"]; 
    $password = $_POST["password"];
    $password_confirm = $_POST["confirm_password"];
    $room = $_POST["room"]; 
    $email = $_POST['email'];
    
    

if ($_FILES) {
    $image = $_FILES['avatar'];
} else {
    $errors['avatar'] = "avatar is required";
}





// // vaildata inputs


foreach ($_POST as $key => $value) {
    if (empty($value)) {
        $errors[$key] = "$key is required";
    }
}

check($errors);


// vaildate data


if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = "email is invalid";
    check($errors);
}



//  vaildate email in db


// echo json_encode(["sdaas" => "sdad"]);
// exit();

checkPassoword($password,$password_confirm,$errors);
check($errors);


$vaild_extention = ['png', 'jpeg', 'jpg'];
$vaild_size = 1024 * 1024;
$size = $image['size'];

$extention = explode('/', $image['type'])[1];
$new_img_name = $username . "_" . time();
$path = 'images/user/' . $new_img_name.'.'.$extention;
$full_path = "http://localhost/".$path;

if (in_array($extention, $vaild_extention, true) && ($size <= $vaild_size)) {
    move_uploaded_file($image['tmp_name'], "../" . $path);

    $db = new DB($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);
    //  email in db
    $res = $db->validate_email_in_db($email);
    if(!$res){
        $errors['email'] = "email already exists";
        check($errors);
    }

    // $avilable_rooms = [];
    $unavilable_rooms = $db->get_inValidRooms();
    if(in_array($room,$unavilable_rooms)){
        $errors['room'] = "this room is not avilable";
        check($errors);
    }
    
    $res2 = $db->insert("user", [
        "name" => $username,
        "email" => $email,
        "password" => $password,
        "avatar" => $full_path,
        "room" => $room,
    ]);
    $res3 = $db->select_one_row("user", "email = $email");
    if($res){
        $response = [
            "status" => true,
            "data" => $res3,
        ];

        print_r(json_encode($response));
        exit();
    }
    // $user = $db->single_row("user", [["email" => $email], ["op" => "="]]);
    // if($user['email']){
    //     $errors['email'] = "email already exist";
    //     check($errors);
    // }

    // $db->insert(
    //     "user",
    //     [
    //         "name" => $username,
    //         "email" => $email,
    //         "password" => sha1($password),
    //         "avatar" => $path

    //     ]
    // );

    // $user = $db->single_row("user", [["email" => $email], ["op" => "="]]);
    // $_SESSION["loged"] = $user['id'];
} else {

    $errors['avatar'] = "avatar is invalid";
    check($errors);
}









// move_uploaded_file($file["tmp_name"], "../image/" . $name);









// $response = [
//     "status" => true,
//     "data" => [
//         "user" => $username,
//         "email" => $email,
//         "password" => $password,
//         "imag" => $path,
//     ]
// ];
// exit();
// print_r(json_encode($response));
// exit();
