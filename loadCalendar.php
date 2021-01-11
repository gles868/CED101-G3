<?php

require_once("connectced101g3_test.php");

$data = array();

$sql = "SELECT course.courseName, class.courseStartDate 
        FROM course JOIN class ON course.courseNo = class.courseNo";
$courseDate = $pdo->prepare($sql);
$courseDate->execute();

$dateRows = $courseDate->fetchAll(PDO::FETCH_ASSOC);

foreach ($dateRows as $row){
    $data[] = array(
        'title' => $row['courseName'],
        'start' => $row['courseStartDate'],
    );
}

echo json_encode($data);

?>