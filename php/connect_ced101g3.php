<?php
$dbname = "tibamefe_ced101g3";
$dsn = "mysql:host=localhost;port=3306;dbname=$dbname;charset=utf8";
$user = "tibamefe_since2021";
$password = "vwRBSb.j&K#E";
$options = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_CASE => PDO::CASE_NATURAL);
$pdo = new PDO($dsn, $user, $password, $options)
?>