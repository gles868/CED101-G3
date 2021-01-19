<?php
require_once("connectced101g3_test.php");
$sql = "select * from course_list where memberNo = 3"; 
$getlovedCourse = $pdo->prepare($sql);
$getlovedCourse->execute();
$lovedCourseRow = $getlovedCourse->fetchAll();(PDO::FETCH_ASSOC);
echo json_encode($lovedCourseRow);
?>