<?php
try {
    require_once "connect_ced101g3.php";

    $sql = "SELECT * FROM `employee` WHERE empType = 1";
    $teacherData = $pdo->prepare($sql);
    $teacherData->execute();
    $teacherDataRows = $teacherData->fetchAll(PDO::FETCH_ASSOC);

    for($i = 0; $i < count($teacherDataRows); $i++){
        if($teacherDataRows[$i]["empStatus"] == 0){  // 如果狀態為停權就隱藏
            $teacherDataRows[$i]["ischecked"] = false;
        }else{  // 如果狀態正常就顯示
            $teacherDataRows[$i]["ischecked"] = true;
        }
        
    };

    echo json_encode($teacherDataRows);
} catch (PDOException $e) {
    echo "錯誤行號 : " . $e->getLine() . "<br>";
    echo "錯誤原因 : " . $e->getMessage() . "<br>";
}