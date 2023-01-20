<?php
session_start();
// echo $_SESSION['loged'];

unset($_SESSION['user_id']);
unset($_SESSION['role']);
echo json_encode(['status' => true]);
exit();
