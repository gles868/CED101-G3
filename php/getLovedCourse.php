<?php
require_once("connect_ced101g3.php");
session_start();
$sql = "select * from course_list where memberNo = ?"; 
$getlovedCourse = $pdo->prepare($sql);
$getlovedCourse->bindValue(1, $_SESSION["memberNo"]);
$getlovedCourse->execute();
$lovedCourseRow = $getlovedCourse->fetchAll();(PDO::FETCH_ASSOC);
echo json_encode($lovedCourseRow);
?>