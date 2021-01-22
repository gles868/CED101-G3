<?php
//從資料庫抓出班級資料
require_once "./connect_ced101g3.php";

//$decoded為自定義將整包jason打開的 變數(若不需帶值以下三行都不用寫)
$content = trim(file_get_contents("php://input"));
$decoded = json_decode($content, true);
// $mem_no為自定義將需要之物件由打開之jason檔取用的 變數
// $mem_no = $decoded["memberno"];

$data = array();

$sql = "SELECT co.courseName, c.courseStartDate, co.courseNo 
        FROM registration re join class c on re.classNo = c.classNo
            JOIN course co ON c.courseNo = co.courseNo 
        where re.memberNo = 5
        ";

$courseDate = $pdo->prepare($sql);
//bindValue為定義值:memberNo為$mem_no變數值(sql只認識:memberNo)
// $courseDate->bindValue(":memberNo",$mem_no);

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
    $data[$i]["url"] = "singleCourse.php?courseNo={$dateRows[$i]["courseNo"]}";
};

echo json_encode($data);