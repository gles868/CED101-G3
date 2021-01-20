

<?php
//接收courseNo後新增收藏
require_once("connectced101g3_test.php");
$sql = "insert into course_list (courseNo, memberNo) values (?,3)"; 
$lovedCourse = $pdo->prepare($sql);
$lovedCourse->bindValue(1, $_GET["courseNo"]);
$lovedCourse->execute();

//收藏完後回傳收藏資料到JS
require_once("connectced101g3_test.php");
$sql = "select * from course_list where memberNo = 3"; 
$getlovedCourse = $pdo->prepare($sql);
$getlovedCourse->execute();
$lovedCourseRow = $getlovedCourse->fetchAll();(PDO::FETCH_ASSOC);
echo json_encode($lovedCourseRow);

?>