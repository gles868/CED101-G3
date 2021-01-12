<?php
$dbname = "ced101g3_test";
$dsn = "mysql:host=localhost;port=3306;dbname=$dbname;charset=utf8";
$user = "root";
$password = "root";
$options = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_CASE => PDO::CASE_NATURAL);
$pdo = new PDO($dsn, $user, $password, $options)
?>