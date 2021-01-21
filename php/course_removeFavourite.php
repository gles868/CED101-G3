
<?php
require_once("connect_ced101g3.php");


$sql = "DELETE FROM course_list where courseNo = ? and memberNo = 3"; 
        
$lovedCourse = $pdo->prepare($sql);
$lovedCourse->bindValue(1, $_GET["courseNo"]);
// $lovedCourse->bindValue(2, $_GET["memberNo"]);
$lovedCourse->execute();

?>