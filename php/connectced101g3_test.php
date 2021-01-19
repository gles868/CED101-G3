<?php 
	$dsn = "mysql:host=localhost;port=8888;dbname=tibamefe_ced101g3;charset=utf8";
	$user = "root";
	$password = "root";
	$options = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_CASE => PDO::CASE_NATURAL);
	$pdo = new PDO($dsn, $user, $password, $options);
?>