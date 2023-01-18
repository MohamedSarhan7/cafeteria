<?php
// require_once("./env.php");
// require_once("./checksDB.php");

// $full_path = '';
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

function checkPassoword($password, $password_confirm, $errors)
{

    if (isValidPassword($password) == false) {
        $errors['password'] = "password is invalid";
    } elseif (isValidPassword($password_confirm) == false) {
        $errors['confirm_password'] = "password is invalid";
    } elseif ($password != $password_confirm) {
        $errors['confirm_password'] = "password is doesn't match";
    }
    check($errors);
}

function check($errors)
{
    if ($errors) {
        echo json_encode([
            "status" => false,
            "errors" => $errors
        ]);
        exit();
    }
}

function isVAildImage($image)
{

    $vaild_extention = ['png', 'jpeg', 'jpg'];
    $vaild_size = 1024 * 1024;
    $size = $image['size'];

    $extention = explode('/', $image['type'])[1];

    // $full_path = "http://localhost/" . $path;

    if (in_array($extention, $vaild_extention, true) && ($size <= $vaild_size)) {
        return true;
    }
    return false;
}


function isValidUser($errors, $db)
{
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


    foreach ($_POST as $key => $value) {
        if (empty($value)) {
            $errors[$key] = "$key is required";
        }
    }

    check($errors);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = "email is invalid";
        check($errors);
    }



    checkPassoword($password, $password_confirm, $errors);
    check($errors);

    $image_res = isVAildImage($image);
    if (!$image_res) {
        $errors['avatar'] = "avatar is invalid";
        check($errors);
    }

    $extention = explode('/', $image['type'])[1];
    $new_img_name = $username . "_" . time();
    $path = 'images/user/' . $new_img_name . '.' . $extention;
    global $full_path;
    $full_path = "http://localhost/" . $path;


    
    
    //  email in db
    $res = $db->validate_email_in_db($email);
    if (!$res) {
        $errors['email'] = "email already exists";
        check($errors);
    }
    
    // $avilable_rooms = [];
    $unavilable_rooms = $db->get_inValidRooms();
    if (in_array($room, $unavilable_rooms)) {
        $errors['room'] = "this room is not avilable";
        check($errors);
    }

    move_uploaded_file($image['tmp_name'], "../" . $path);
    $response = [
        "status" => true,
        "data" => $errors
    ];
    return $response;
}
