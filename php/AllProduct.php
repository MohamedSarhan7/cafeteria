
<?php

require("../db.php");

$products = new DB("mysql", "localhost:3307", "cafe", "root", "1234");



$Product = $_REQUEST['product'];
$Price = $_REQUEST['Price'];
$img = $_FILES['img'];


$extension = explode('/', mime_content_type($img['tmp_name']))[1];

if($img['size'] == 1024 * 1024 && $extension == 'png' || $extension == 'jpeg' || $extension != 'jpg')
{
    $fileName = time() . '.' . $extension;
    move_uploaded_file($img['tmp_name'], './image/' . $fileName);
}
else{
    // header(window.location: './index.html');
    // exit();
    ?>
    <script>
   
     alert ("pick another photo");

     window.location='./index.html';
   
        </script>
        <?php
}


$newProject = [
    'Product' => $Product,
    'Price' => $Price,
    'fileName' => $fileName
];

<section class="table">
<table>
    <thead>
        <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Image</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($users as $user) : ?>
            <tr>
                <td>
                    <p><?php echo $user['Product'] ?></p>
                        <input type="text" value="" class="input">
                </td>
                <td>
                    <p><?php echo $user['Price'] ?></p>
                        <input type="text" value="" class="input">
                </td>
                <td>
                    <p><?php echo $user['Image'] ?></p>
                        <input type="image" value="" class="input">
            </td>
            <td class="choice">
                        <p><a>Available</a>
                            <select name="available" id="available">
                                <option selected disabled>Choose</option>
                                <option value="available">Available</option>
                                <option value="unavailable">Unavailable</option>
                            </select>
                        <a class="edit">Edit</a>
                        <a class="delete">Delete</a></p>
                    </td>
            </tr>
        <?php endforeach   ?>
    </tbody>
</table>
</section>