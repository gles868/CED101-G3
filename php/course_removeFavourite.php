
<?php
require_once("connect_ced101g3.php");

session_start();
$sql = "DELETE FROM course_list where courseNo = ? and memberNo = ?"; 
        
$lovedCourse = $pdo->prepare($sql);
$lovedCourse->bindValue(1, $_GET["courseNo"]);
$lovedCourse->bindValue(2, $_SESSION["memberNo"]);
$lovedCourse->execute();

?>