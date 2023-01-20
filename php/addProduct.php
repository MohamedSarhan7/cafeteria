<?php
require_once('./env.php');
require_once("./db.php");

$db = new DB($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);

$full_path = '';
$responsToJS = [];
$errors = [];
foreach ($_POST as $key => $value) {
    if (empty($value)) {
        $errors[$key] = "$key is required";
    }
}
if ($errors) {
    $responsToJS = ["status" => false, "data" => $errors];
    echo json_encode($responsToJS);
    exit();
}


$product_name = $_POST['product'];
$price = $_POST['price'];
$category = $_POST['category'];
//validate procuct
if ((strlen($product_name)) > 50) {
    $errors['product'] = "product name must not be more than 50 charcters";
    $responsToJS = ["status" => false, "data" => $errors];
    echo json_encode($responsToJS);
    exit();
}


//validate price
if ($price < 0) {
    $errors['price'] = "price must not be less than 0 EGP";
    $responsToJS = ["status" => false, "data" => $errors];
    echo json_encode($responsToJS);
    exit();
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
$image_res = isVAildImage($_FILES['picture']);
if (!$image_res) {
    $errors['picture'] = "size or extention is invalid (size must be less than 1,048,576 byte and extention must be(png/jpeg/jpg))";
    $responsToJS = ["status" => false, "data" => $errors];
    echo json_encode($responsToJS);
    exit();
}

$extention = explode('/', $_FILES['picture']['type'])[1];
$new_img_name = $product_name . "_" . time();
$path = 'images/product/' . $new_img_name . '.' . $extention;
global $full_path;
$full_path = "http://localhost/" . $path;




$result = $db->select_one_row("product", "name = '$product_name' ");
if ($result) {
    $errors['product'] = "product is already exist";
    $responsToJS = ["status" => false, "data" => $errors];
    echo json_encode($responsToJS);
    exit();
} else {
    $new_product = [
        "name" => $product_name,
        "category_id" => $category,
        "avatar" => $full_path,
        "price"=>$price,
    ];
    $res = $db->insert("product", $new_product);

    // $result = $sql->execute();
    if ($res) {
        move_uploaded_file($_FILES['picture']['tmp_name'], "../" . $path);
        $responsToJS = ["status" => true, "data" => " $product_name added successfully"];
    } else {
        $errors["picture"] = "the are some errors, try agian";
        $responsToJS = ["status" => false, "data" => $errors];
        // echo json_encode($responsToJS);
    }
    echo json_encode($responsToJS);
    exit();
}
