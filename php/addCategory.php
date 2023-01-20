<?php
require_once("./env.php");
require_once('./db.php');
$db = new DB($DATABASE, $DATABASE_HOST, $DATABASE_NAME, $DATABASE_USERNAME, $DATABASE_PASSWORD);

//authentication

// validate all fields are required


$errors = [];
foreach ($_POST as $key => $value) {
    if (empty($value)) {
        $errors[$key] = "$key is required";
    }
}
$category = $_POST['category'];

if ($errors) {
    $responsToJS = ["status" => false, "data" => $errors];
    echo json_encode($responsToJS);
    exit();
}

if ((strlen($category)) > 100) {
    $errors['category'] = "category must not be more than 100 charcters";
    $responsToJS = ["status" => false, "data" => $errors];
    echo json_encode($responsToJS);
    exit();
}


$result = $db->select_one_row("category", "name = '$category' ");

if ($result) {
    $errors['category'] = "category is already exist";
    $responsToJS = ["status" => false, "data" => $errors];
    echo json_encode($responsToJS);
    exit();
}
$result = $db->insert("category", ["name" => $category]);

if ($result) {
    $responsToJS = ["status" => true,"data"=> "category $category added successflly"];
    echo json_encode($responsToJS);
    exit();
} else {
    $errors["category"] = "the are some errors, try agian";
    $responsToJS = ["status" => false, "data" => $errors];
    echo json_encode($responsToJS);
    exit();
}
