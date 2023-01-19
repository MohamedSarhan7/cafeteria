<?php
require_once("./env.php");
// require_once("./checksDB.php");
//require_once("./valid_user.php");
require ("./db.php");
$db = new DB(DATABASE, DATABASE_HOST, DATABASE_NAME, DATABASE_USER, DATABASE_PASS);
$errors = [];
$response = [];
$update=[];
$full_path = '';

function isVAildImage($image)
{
    $vaild_extention = ['png', 'jpeg', 'jpg'];
    $vaild_size = 1024 * 1024;
    $size = $image['size'];
    $extention = explode('/', $image['type'])[1];
    if (in_array($extention, $vaild_extention, true) && ($size <= $vaild_size)) {
        return true;
    }
    return false;
}
//check new img



$userID = $_POST['user_id'];
$username = $_POST["username"];
$price = $_POST["price"];
$categoryId = $_POST['category'];

if ($_FILES) {
    $image = $_FILES['avatar'];
    $res = isVAildImage($image);
    if (!$res) {
        $errors['avatar'] = "avatar is not vaild";
        check($errors);
    }
    $extention = explode('/', $image['type'])[1];
    $new_img_name = $username . "_" . time();
    $path = 'images/product/' . $new_img_name . '.' . $extention;
    global $full_path;
    $full_path = "http://localhost/" . $path;
    $update['avatar'] = $full_path;
    move_uploaded_file($image['tmp_name'], "../" . $path);
}






//check for name is all alphabetic 
if (ctype_alpha($username)) {
    $update['name']=$username;
}
else {
    $errors['name']="name is not valid";
}

//check for empty values


foreach ($_POST as $key => $value) {
    if (empty($value)) {
        $errors[$key] = "$key is required";
    }
    check($errors);
}



//check for price

    if ($price<0){
        $errors["price"]='price is not valid';
    }
    else {
        $update["price"]=$price;
    }


// check valid category

//$categories = $db->selectAll("category", "");


// function isVAildCategory($category,$categories)
// {
//     if (in_array($category, $categories, true)) {
//         return true;
//     }
//     return false;
// }


// if (isVAildCategory($category,$categories))
// {
     $update["category_id"]=$categoryId;
// }

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
check($errors);

//     if ($_POST['password']) {
//         $password = $_POST["password"];
//         $password_confirm = $_POST["confirm_password"];
//         checkPassoword($password, $password_confirm, $errors);
//     }
// $user = $db->select_one_row("user", "id = $userID ");
// if($user['name']!=$username){
//     $update['name'] = $username;
// }

// if ($user['email'] != $email) {
//     $res = $db->validate_email_in_db($email);
//     if($res){

//         $update['email'] = $email;
//     }
//     else{
//         $errors['email'] = "email already exists!";
//     }
// }

// if ($user['room'] != $room) {
//     $unavilable_rooms = $db->get_inValidRooms();
//     if (in_array($room, $unavilable_rooms)) {
//         $errors['room'] = "this room is not avilable";
//     }else{

//         $update['room'] = $room;
//     }
// }
// check($errors);

$result = $db->update("product", $userID, $update);
if(!$result){
    $response = ["status" => false, "errors" => $result];
}else{
    $response = ["status" => true, "data" => "Product $username Updated successflly"];

}

 echo json_encode($response);
 exit();