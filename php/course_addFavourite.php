

<?php
//接收courseNo後新增收藏
<<<<<<< HEAD
require_once("connect_ced101g3.php");
$sql = "insert into course_list (courseNo, memberNo) values (?,3)"; 
=======
session_start();
$memberNo =
require_once("connect_ced101g3.php");
$sql = "insert into course_list (courseNo, memberNo) values (?,?)"; 
>>>>>>> chu
$lovedCourse = $pdo->prepare($sql);
$lovedCourse->bindValue(1, $_GET["courseNo"]);
$lovedCourse->bindValue(2, $_SESSION["memberNo"]);

$lovedCourse->execute();

//收藏完後回傳收藏資料到JS
require_once("connect_ced101g3.php");
<<<<<<< HEAD
$sql = "select * from course_list where memberNo = 3"; 
=======
$sql = "select * from course_list where memberNo = ?"; 
>>>>>>> chu
$getlovedCourse = $pdo->prepare($sql);
$getlovedCourse->bindValue(1, $_SESSION["memberNo"]);
$getlovedCourse->execute();
$lovedCourseRow = $getlovedCourse->fetchAll();(PDO::FETCH_ASSOC);
echo json_encode($lovedCourseRow);

?>