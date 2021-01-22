

<?php
//接收courseNo後新增收藏
session_start();
$memberNo =
require_once("connect_ced101g3.php");
$sql = "insert into course_list (courseNo, memberNo) values (?,?)"; 
$lovedCourse = $pdo->prepare($sql);
$lovedCourse->bindValue(1, $_GET["courseNo"]);
$lovedCourse->bindValue(2, $_SESSION["memberNo"]);

$lovedCourse->execute();

//收藏完後回傳收藏資料到JS
require_once("connect_ced101g3.php");
$sql = "select * from course_list where memberNo = ?"; 
$getlovedCourse = $pdo->prepare($sql);
$getlovedCourse->bindValue(1, $_SESSION["memberNo"]);
$getlovedCourse->execute();
$lovedCourseRow = $getlovedCourse->fetchAll();(PDO::FETCH_ASSOC);
echo json_encode($lovedCourseRow);

?>