<?php
//從資料庫抓出班級資料
require_once "connect_ced101g3.php";

$content = trim(file_get_contents("php://input"));
$decoded = json_decode($content, true);

$group_ord_no = $decoded["group_ord_no"];

$data = array();

$sql = "SELECT course.courseName, class.courseStartDate, class.classNo
        FROM course JOIN class ON course.courseNo = class.courseNo 
        where course.courseNo = :courseNo";
$courseDate = $pdo->prepare($sql);
$courseDate->bindValue(":courseNo",$group_ord_no);

$courseDate->execute();

$dateRows = $courseDate->fetchAll(PDO::FETCH_ASSOC);

// foreach ($dateRows as $row) {
//     $data[] = array(
//         'title' => $row['courseName'],
//         'start' => $row['courseStartDate'],
//         'url' => ["registration.html"], //跳轉到報名頁
//     );
// };
for($i=0; $i < count($dateRows); $i++){ 
    $data[$i]["title"] = $dateRows[$i]["courseName"];
    $data[$i]["start"] = $dateRows[$i]["courseStartDate"];
 
    $data[$i]["url"] = "registration.php?classNo={$dateRows[$i]["classNo"]}";

};

echo json_encode($data);