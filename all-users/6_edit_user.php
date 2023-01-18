<?php
require_once("./env.php");
require_once("./checksDB.php");
require_once("./valid_user.php");
$db = new checks($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);
$errors = [];
$response = [];
$update=[];
$full_path = '';

if ($_FILES) {
    $image = $_FILES['avatar'];
    $res = isVAildImage($image);
    if (!$res) {
        $errors['avatar'] = "avatar is not vaild";
        check($errors);
    }
    $extention = explode('/', $image['type'])[1];
    $new_img_name = $username . "_" . time();
    $path = 'images/user/' . $new_img_name . '.' . $extention;
    global $full_path;
    $full_path = "http://localhost/" . $path;
    $update['avatar'] = $full_path;
    move_uploaded_file($image['tmp_name'], "../" . $path);

}


foreach ($_POST as $key => $value) {
    if (empty($value)) {
        $errors[$key] = "$key is required";
    }
    check($errors);
}

    $userID = $_POST['user_id'];
    $username = $_POST["username"];
    $room = $_POST["room"];
    $email = $_POST['email'];

    if ($_POST['password']) {
        $password = $_POST["password"];
        $password_confirm = $_POST["confirm_password"];
        checkPassoword($password, $password_confirm, $errors);
    }
$user = $db->select_one_row("user", "id = $userID ");
if($user['name']!=$username){
    $update['name'] = $username;
}

if ($user['email'] != $email) {
    $res = $db->validate_email_in_db($email);
    if($res){

        $update['email'] = $email;
    }
    else{
        $errors['email'] = "email already exists!";
    }
}

if ($user['room'] != $room) {
    $unavilable_rooms = $db->get_inValidRooms();
    if (in_array($room, $unavilable_rooms)) {
        $errors['room'] = "this room is not avilable";
    }else{

        $update['room'] = $room;
    }
}
check($errors);

$result = $db->update("user", $userID, $update);
if(!$result){
    $response = ["status" => false, "errors" => $result];
}else{
    $response = ["status" => true, "data" => "User $username Updated successflly"];

}

echo json_encode($response);
exit();